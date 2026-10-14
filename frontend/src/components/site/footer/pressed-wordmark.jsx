export default function PressedWordmark() {
  return (
    <div className="footerPressedWordmark" aria-hidden="true">
      <svg viewBox="0 0 1000 190" preserveAspectRatio="xMidYMid meet" className="footerPressedMark pointer-events-none select-none">
        <defs>
          <filter id="bbclinic-deboss" x="-2%" y="-8%" width="104%" height="116%" colorInterpolationFilters="sRGB">
            <feOffset in="SourceAlpha" dy="0.95" result="down" />
            <feGaussianBlur in="down" stdDeviation="0.6" result="downSoft" />
            <feComposite in="SourceAlpha" in2="downSoft" operator="out" result="topBand" />
            <feFlood className="footerPressShade" result="shadeInk" />
            <feComposite in="shadeInk" in2="topBand" operator="in" result="innerShade" />

            <feOffset in="SourceAlpha" dy="-0.55" result="up" />
            <feGaussianBlur in="up" stdDeviation="0.35" result="upSoft" />
            <feComposite in="SourceAlpha" in2="upSoft" operator="out" result="bottomBand" />
            <feFlood className="footerPressLight" result="lightInk" />
            <feComposite in="lightInk" in2="bottomBand" operator="in" result="innerLight" />

            <feOffset in="SourceAlpha" dy="2.8" result="deep" />
            <feGaussianBlur in="deep" stdDeviation="2" result="deepSoft" />
            <feComposite in="SourceAlpha" in2="deepSoft" operator="out" result="floorBand" />
            <feFlood className="footerPressFloor" result="floorInk" />
            <feComposite in="floorInk" in2="floorBand" operator="in" result="floor" />

            <feOffset in="SourceAlpha" dy="0.55" result="lipDown" />
            <feComposite in="lipDown" in2="SourceAlpha" operator="out" result="lipBand" />
            <feFlood className="footerPressLip" result="lipInk" />
            <feComposite in="lipInk" in2="lipBand" operator="in" result="lip" />

            <feMerge>
              <feMergeNode in="lip" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="floor" />
              <feMergeNode in="innerShade" />
              <feMergeNode in="innerLight" />
            </feMerge>
          </filter>
        </defs>

        <text x="494" y="158" textAnchor="middle" textLength="1008" lengthAdjust="spacingAndGlyphs" className="footerPressedText" filter="url(#bbclinic-deboss)" fill="#E2E2E2">
          BBCLINIC
        </text>
      </svg>
    </div>
  );
}
