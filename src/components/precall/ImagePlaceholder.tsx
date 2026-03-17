interface ImagePlaceholderProps {
  variant?: "hero-img" | "editorial" | "wide" | "portrait" | "cinematic";
  fullBleed?: boolean;
  label: string;
  brief: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImagePlaceholder({
  variant = "editorial",
  fullBleed = false,
  label,
  brief,
  className = "",
  style,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`img-placeholder ${variant}${fullBleed ? " full-bleed" : ""} ${className}`.trim()}
      style={style}
    >
      <div className="img-ph-inner" />
      <div className="img-ph-content">
        <div className="img-ph-icon">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <div className="img-ph-label">{label}</div>
        <div className="img-ph-brief">{brief}</div>
      </div>
    </div>
  );
}
