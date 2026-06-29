interface BadgeProps {
  label: string;
  bg?: string;
  text?: string;
  className?: string;
}

export default function Badge({
  label,
  bg = "rgba(255,255,255,0.1)",
  text = "#fffbe8",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap leading-none ${className}`}
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
    </span>
  );
}
