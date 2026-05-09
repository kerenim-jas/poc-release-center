import Link from "next/link";
import { Release } from "@/lib/fixtures";
import { Badge, Pill } from "./Badge";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  CircleSlash,
  ShieldAlert,
  ShieldCheck,
  Skull,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/cn";

function SlaCell({ release }: { release: Release }) {
  const { sla } = release;
  if (sla.status === "expired") {
    return (
      <Badge tone="danger" icon={<Clock className="h-3 w-3" />}>
        {sla.label}
      </Badge>
    );
  }
  if (sla.status === "expiring") {
    return (
      <Badge tone="warning" icon={<Clock className="h-3 w-3" />}>
        {sla.label}
      </Badge>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--text-secondary)]">
      <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--green-500)]" />
      {sla.label}
    </span>
  );
}

function RuntimeCell({ release }: { release: Release }) {
  const { runtime } = release;
  if (runtime.status === "not-running") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--text-tertiary)]">
        <CircleSlash className="h-3.5 w-3.5" />
        Not running
      </span>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Pill tone="success">Running</Pill>
      <span className="text-[13px] text-[color:var(--text-secondary)]">
        {runtime.clusterCount} {runtime.clusterCount === 1 ? "cluster" : "clusters"}
      </span>
      <span
        className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)] px-1.5 py-0.5 rounded border border-[color:var(--border-secondary)]"
        title={`Data source: ${runtime.dataSource}`}
      >
        {runtime.dataSource === "wiz" ? "via Wiz" : runtime.dataSource}
      </span>
    </div>
  );
}

function RiskCell({ release }: { release: Release }) {
  const { topRisk, integrityDrift, criticalApplicableCves, maliciousPackages } =
    release.risks;

  if (integrityDrift) {
    return (
      <Badge tone="danger" icon={<ShieldAlert className="h-3 w-3" />}>
        Integrity drift
      </Badge>
    );
  }
  if (maliciousPackages > 0) {
    return (
      <Badge tone="danger" icon={<Skull className="h-3 w-3" />}>
        Malicious package
      </Badge>
    );
  }
  if (criticalApplicableCves > 0) {
    return (
      <Badge tone="danger" icon={<AlertTriangle className="h-3 w-3" />}>
        {criticalApplicableCves} critical CVE{criticalApplicableCves > 1 ? "s" : ""}
      </Badge>
    );
  }
  if (topRisk.level === "info") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--text-tertiary)]">
        <CircleSlash className="h-3.5 w-3.5" />
        {topRisk.label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--green-500)]">
      <ShieldCheck className="h-3.5 w-3.5" />
      Healthy
    </span>
  );
}

function HeaderCell({
  children,
  sortable = true,
  className,
}: {
  children: React.ReactNode;
  sortable?: boolean;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]",
        className
      )}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortable && (
          <ChevronDown className="h-3 w-3 text-[color:var(--icon-tertiary)]" />
        )}
      </span>
    </th>
  );
}

export function ReleasesTable({ releases }: { releases: Release[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-[color:var(--border-primary)] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[color:var(--border-primary)] bg-[color:var(--surface-secondary)]">
              <th className="w-10 px-2" />
              <HeaderCell>Release</HeaderCell>
              <HeaderCell>Version</HeaderCell>
              <HeaderCell sortable={false}>Trust</HeaderCell>
              <HeaderCell>SLA</HeaderCell>
              <HeaderCell>Runtime status</HeaderCell>
              <HeaderCell>Top risk</HeaderCell>
              <HeaderCell>Owner</HeaderCell>
              <th className="w-10 px-2" />
            </tr>
          </thead>
          <tbody>
            {releases.map((r) => (
              <tr
                key={r.id}
                className="group border-b border-[color:var(--border-primary)] last:border-b-0 transition-colors hover:bg-[color:var(--surface-secondary)]"
              >
                <td className="w-10 px-2 text-center">
                  <button
                    type="button"
                    className="opacity-0 transition-opacity group-hover:opacity-100 inline-flex h-6 w-6 items-center justify-center rounded text-[color:var(--icon-secondary)] hover:bg-[color:var(--surface-tertiary)]"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <Link
                      href={`/releases/${r.id}`}
                      className="text-[13px] font-semibold text-[color:var(--text-active)] hover:underline"
                    >
                      {r.name}
                    </Link>
                    <span className="text-[11px] text-[color:var(--text-tertiary)] mt-0.5">
                      {r.branch}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <code className="text-[13px] text-[color:var(--text-primary)] font-mono">
                    {r.version}
                  </code>
                </td>
                <td className="px-4 py-3">
                  {r.trustedBadge ? (
                    <Badge tone="brand" icon={<ShieldCheck className="h-3 w-3" />}>
                      Trusted
                    </Badge>
                  ) : (
                    <Badge tone="neutral">Pre-trust</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <SlaCell release={r} />
                </td>
                <td className="px-4 py-3">
                  <RuntimeCell release={r} />
                </td>
                <td className="px-4 py-3">
                  <RiskCell release={r} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[color:var(--text-primary)]">
                      {r.owner}
                    </span>
                    <span className="text-[11px] text-[color:var(--text-tertiary)]">
                      {r.team}
                    </span>
                  </div>
                </td>
                <td className="w-10 px-2" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
