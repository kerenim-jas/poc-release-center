import { cn } from "@/lib/cn";

type BadgeTone = "success" | "warning" | "danger" | "info" | "neutral" | "brand";

const toneClasses: Record<BadgeTone, string> = {
  success:
    "bg-[color:var(--green-100)] text-[color:var(--green-500)] border-[color:var(--green-500)]/20",
  warning:
    "bg-[color:var(--orange-100)] text-[color:var(--orange-500)] border-[color:var(--orange-500)]/30",
  danger:
    "bg-[color:var(--red-100)] text-[color:var(--red-500)] border-[color:var(--red-200)]",
  info: "bg-[color:var(--navy-100)] text-[color:var(--navy-600)] border-[color:var(--navy-200)]",
  neutral:
    "bg-[color:var(--surface-tertiary)] text-[color:var(--text-secondary)] border-[color:var(--border-secondary)]",
  brand:
    "bg-[color:var(--green-100)] text-[color:var(--green-500)] border-[color:var(--green-500)]/40",
};

export function Badge({
  tone = "neutral",
  children,
  className,
  icon,
  size = "md",
}: {
  tone?: BadgeTone;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border whitespace-nowrap font-semibold",
        size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-0.5 text-xs",
        toneClasses[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function Pill({
  tone = "success",
  children,
}: {
  tone?: "success" | "neutral" | "danger";
  children: React.ReactNode;
}) {
  const cls = {
    success: "bg-[color:var(--green-100)] text-[color:var(--green-500)]",
    neutral: "bg-[color:var(--surface-tertiary)] text-[color:var(--text-secondary)]",
    danger: "bg-[color:var(--red-100)] text-[color:var(--red-500)]",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold",
        cls
      )}
    >
      {children}
    </span>
  );
}
