"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

export function ImageCompare({
  beforeImage,
  afterImage,
  alt,
  beforeLabel,
  afterLabel,
  initialPosition = 50,
  className,
  sizes = "(max-width: 1024px) 92vw, 46vw",
}) {
  const t = useTranslations("compare");
  const resolvedBeforeLabel = beforeLabel || t("before");
  const resolvedAfterLabel = afterLabel || t("after");
  const initialValue = clamp(initialPosition / 100, 0, 1);
  const [motion, setMotion] = useState({ position: initialValue, bend: 0 });
  const [held, setHeld] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 920, height: 600 });
  const currentPosition = useRef(initialValue);
  const targetPosition = useRef(null);
  const lineEnds = useRef({ position: initialValue, velocity: 0 });
  const animationFrame = useRef(0);
  const containerRef = useRef(null);
  const dragState = useRef(null);
  const dimensionsRef = useRef(dimensions);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.max(1, entry.contentRect.width);
      const height = Math.max(1, entry.contentRect.height);
      const nextDimensions = { width, height };
      dimensionsRef.current = nextDimensions;
      setDimensions(nextDimensions);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotion.current = mediaQuery.matches;
    };
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => () => window.cancelAnimationFrame(animationFrame.current), []);

  function startAnimation() {
    if (animationFrame.current) return;
    let previousTime = performance.now();

    const animate = (time) => {
      const deltaTime = Math.min(0.033, (time - previousTime) / 1000);
      previousTime = time;
      if (targetPosition.current !== null) {
        currentPosition.current += (targetPosition.current - currentPosition.current) * (1 - Math.pow(0.0004, deltaTime));
        if (Math.abs(targetPosition.current - currentPosition.current) < 0.0005) {
          currentPosition.current = targetPosition.current;
          targetPosition.current = null;
        }
      }

      const line = lineEnds.current;
      line.velocity += ((currentPosition.current - line.position) * 620 - line.velocity * 44) * deltaTime;
      line.position += line.velocity * deltaTime;
      const width = dimensionsRef.current.width;
      const bend = clamp((currentPosition.current - line.position) * width * 0.5, -10, 10);
      setMotion({ position: currentPosition.current, bend });

      const settled = targetPosition.current === null
        && Math.abs(currentPosition.current - line.position) < 0.0006
        && Math.abs(line.velocity) < 0.002;
      if (settled) {
        line.position = currentPosition.current;
        line.velocity = 0;
        setMotion({ position: currentPosition.current, bend: 0 });
        animationFrame.current = 0;
        return;
      }
      animationFrame.current = window.requestAnimationFrame(animate);
    };

    animationFrame.current = window.requestAnimationFrame(animate);
  }

  function moveImmediately(position) {
    const nextPosition = clamp(position, 0, 1);
    targetPosition.current = null;
    currentPosition.current = nextPosition;
    setMotion((current) => ({ position: nextPosition, bend: current.bend }));
    startAnimation();
  }

  function glideTo(position) {
    const nextPosition = clamp(position, 0, 1);
    if (reducedMotion.current) {
      targetPosition.current = null;
      currentPosition.current = nextPosition;
      lineEnds.current = { position: nextPosition, velocity: 0 };
      setMotion({ position: nextPosition, bend: 0 });
      return;
    }
    targetPosition.current = nextPosition;
    startAnimation();
  }

  function positionFromPointer(clientX) {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds?.width) return currentPosition.current;
    return clamp((clientX - bounds.left) / bounds.width, 0, 1);
  }

  const dividerX = motion.position * dimensions.width;
  const lineTop = dividerX - motion.bend;
  const linePath = `M ${lineTop.toFixed(2)} 0 Q ${(dividerX + motion.bend).toFixed(2)} ${dimensions.height / 2} ${lineTop.toFixed(2)} ${dimensions.height}`;
  const clipPath = `path("M 0 0 L ${lineTop.toFixed(2)} 0 Q ${(dividerX + motion.bend).toFixed(2)} ${dimensions.height / 2} ${lineTop.toFixed(2)} ${dimensions.height} L 0 ${dimensions.height} Z")`;
  const beforePercentage = Math.round(motion.position * 100);

  return (
    <div
      ref={containerRef}
      className={cn("cmp", className)}
      data-held={held || undefined}
      role="slider"
      tabIndex={0}
      aria-label={t("ariaLabel", { alt })}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={beforePercentage}
      aria-valuetext={t("valueText", { before: resolvedBeforeLabel, beforePercentage, after: resolvedAfterLabel, afterPercentage: 100 - beforePercentage })}
      style={{ "--compare-position": `${motion.position * 100}%` }}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture?.(event.pointerId);
        const position = positionFromPointer(event.clientX);
        dragState.current = { velocity: 0, time: performance.now(), lastPosition: position };
        setHeld(true);
        moveImmediately(position);
      }}
      onPointerMove={(event) => {
        const drag = dragState.current;
        if (!drag) return;
        const position = positionFromPointer(event.clientX);
        const now = performance.now();
        drag.velocity = (position - drag.lastPosition) / Math.max(1, now - drag.time);
        drag.time = now;
        drag.lastPosition = position;
        moveImmediately(position);
      }}
      onPointerUp={(event) => {
        const drag = dragState.current;
        dragState.current = null;
        setHeld(false);
        event.currentTarget.releasePointerCapture?.(event.pointerId);
        if (drag && Math.abs(drag.velocity) > 0.0025) glideTo(drag.velocity > 0 ? 1 : 0);
      }}
      onPointerCancel={() => {
        dragState.current = null;
        setHeld(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          const direction = event.key === "ArrowLeft" ? -0.1 : 0.1;
          glideTo((targetPosition.current ?? currentPosition.current) + direction);
        }
        if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          glideTo(event.key === "Home" ? 0 : 1);
        }
      }}
    >
      <Image src={afterImage} alt={alt} fill sizes={sizes} quality={85} draggable={false} className="cmp-img" />
      <div className="cmp-before" style={{ clipPath, WebkitClipPath: clipPath }} aria-hidden="true">
        <Image src={beforeImage} alt="" fill sizes={sizes} quality={85} draggable={false} className="cmp-img" />
      </div>

      <span className="cmp-tag" style={{ opacity: clamp((motion.position - 0.14) * 4, 0, 1) }}>{resolvedBeforeLabel}</span>
      <span className="cmp-tag cmp-right" style={{ opacity: clamp((0.86 - motion.position) * 4, 0, 1) }}>{resolvedAfterLabel}</span>

      <svg className="cmp-line" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} preserveAspectRatio="none" aria-hidden="true">
        <path d={linePath} />
      </svg>
      <span className="cmp-grip">
        <span className="cmp-knob">
          <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
            <path d="M6 1 2 5l4 4M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </div>
  );
}

export const Compare = ImageCompare;
