export default function MenuTrigger({
  className = '',
  controls,
  isOpen,
  label,
  onClick
}) {
  return (
    <button
      type="button"
      aria-controls={controls}
      aria-expanded={isOpen}
      aria-label={label}
      onClick={onClick}
      className={`siteMenuTrigger ${className}`}
    >
      <span className="siteMenuTriggerLine siteMenuTriggerLineTop" />
      <span className="siteMenuTriggerLine siteMenuTriggerLineBottom" />
    </button>
  );
}
