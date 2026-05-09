import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Crumb = { label: string; href?: string };

export function PageHeader({
  breadcrumbs,
  tabs,
  activeTab,
  onTabChange,
}: {
  breadcrumbs: Crumb[];
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
}) {
  return (
    <div className="border-b border-[color:var(--border-primary)] bg-[color:var(--surface-primary)] px-6">
      {/* Breadcrumbs */}
      <div className="flex h-12 items-center gap-1.5 text-[13px]">
        {breadcrumbs.map((c, i) => {
          const isLast = i === breadcrumbs.length - 1;
          return (
            <span key={i} className="flex items-center gap-1.5">
              {c.href && !isLast ? (
                <Link
                  href={c.href}
                  className="text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast
                      ? "text-[color:var(--text-primary)] font-semibold"
                      : "text-[color:var(--text-secondary)]"
                  )}
                >
                  {c.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 text-[color:var(--icon-tertiary)]" />
              )}
            </span>
          );
        })}
      </div>

      {/* Tabs */}
      {tabs && tabs.length > 0 && (
        <div className="flex gap-1 -mb-px">
          {tabs.map((t) => {
            const active = t.id === activeTab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onTabChange?.(t.id)}
                className={cn(
                  "relative flex h-9 items-center px-3 text-[13px] font-semibold transition-colors",
                  active
                    ? "text-[color:var(--text-active)]"
                    : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
                )}
              >
                {t.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[color:var(--navy-600)]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
