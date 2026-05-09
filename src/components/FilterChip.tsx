"use client";

import { cn } from "@/lib/cn";

type Tone = "neutral" | "danger" | "warning" | "info" | "brand";

const toneStyles: Record<Tone, { count: string; activeBorder: string; activeBg: string }> = {
  neutral: {
    count: "bg-[color:var(--surface-tertiary)] text-[color:var(--text-secondary)] border-[color:var(--border-secondary)]",
    activeBorder: "border-[color:var(--text-active)]",
    activeBg: "bg-white",
  },
  danger: {
    count: "bg-[color:var(--red-100)] text-[color:var(--red-500)] border-[color:var(--red-200)]",
    activeBorder: "border-[color:var(--red-500)]",
    activeBg: "bg-white",
  },
  warning: {
    count: "bg-[color:var(--orange-100)] text-[color:var(--orange-500)] border-[color:var(--orange-500)]/30",
    activeBorder: "border-[color:var(--orange-500)]",
    activeBg: "bg-white",
  },
  info: {
    count: "bg-[color:var(--navy-100)] text-[color:var(--navy-600)] border-[color:var(--navy-200)]",
    activeBorder: "border-[color:var(--navy-600)]",
    activeBg: "bg-white",
  },
  brand: {
    count: "bg-[color:var(--green-100)] text-[color:var(--green-500)] border-[color:var(--green-500)]/30",
    activeBorder: "border-[color:var(--green-500)]",
    activeBg: "bg-white",
  },
};

export function FilterChip({
  label,
  count,
  active,
  tone = "neutral",
  icon,
  onClick,
  hint,
}: {
  label: string;
  count?: number;
  active?: boolean;
  tone?: Tone;
  icon?: React.ReactNode;
  onClick?: () => void;
  hint?: string;
}) {
  const styles = toneStyles[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      title={hint}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md border bg-white px-3 py-2 text-[13px] transition-all hover:shadow-[0_1px_4px_rgba(0,0,0,0.08)]",
        active
          ? cn("border-2", styles.activeBorder, styles.activeBg)
          : "border-[color:var(--border-secondary)]"
      )}
    >
      {typeof count === "number" && (
        <span
          className={cn(
            "inline-flex h-6 min-w-[24px] items-center justify-center rounded border px-1.5 text-xs font-semibold",
            styles.count
          )}
        >
          {count}
        </span>
      )}
      <span className={cn("font-semibold", active ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-secondary)]")}>
        {label}
      </span>
      {icon && <span className="ml-0.5 text-[color:var(--icon-secondary)]">{icon}</span>}
    </button>
  );
}
