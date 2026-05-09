"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { FilterChip } from "@/components/FilterChip";
import { ReleasesTable } from "@/components/ReleasesTable";
import { RELEASES, FILTERS, FilterId, applyFilter } from "@/lib/fixtures";
import {
  Plus,
  AlertTriangle,
  Activity,
  Clock,
  ShieldAlert,
  Filter,
  Download,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";

const TABS = [
  { id: "releases", label: "Releases" },
  { id: "workloads", label: "Workloads" },
  { id: "trends", label: "Trends" },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("latest-3-per-branch");
  const [activeTab, setActiveTab] = useState("releases");

  const filteredReleases = useMemo(
    () => applyFilter(RELEASES, activeFilter),
    [activeFilter]
  );

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FILTERS.forEach((f) => {
      counts[f.id] = applyFilter(RELEASES, f.id).length;
    });
    return counts;
  }, []);

  const stats = useMemo(() => {
    const all = RELEASES.length;
    const expired = RELEASES.filter((r) => r.sla.status === "expired").length;
    const expiringSoon = RELEASES.filter((r) => r.sla.status === "expiring").length;
    const malicious = RELEASES.filter((r) => r.risks.maliciousPackages > 0).length;
    const integrity = RELEASES.filter((r) => r.risks.integrityDrift).length;
    const criticalCves = RELEASES.filter(
      (r) => r.risks.criticalApplicableCves > 0
    ).length;
    const running = RELEASES.filter((r) => r.runtime.status === "running").length;
    return { all, expired, expiringSoon, malicious, integrity, criticalCves, running };
  }, []);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Runtime", href: "#" },
          { label: "Supported Releases" },
        ]}
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Page title bar */}
      <div className="border-b border-[color:var(--border-primary)] bg-[color:var(--surface-primary)] px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <h1 className="text-h3 text-[color:var(--text-primary)]">
              Supported Releases
            </h1>
            <span className="text-[12px] text-[color:var(--text-tertiary)]">
              {filteredReleases.length} of {RELEASES.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-7 items-center gap-1.5 rounded border border-[color:var(--border-secondary)] bg-white px-2.5 text-[12px] font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--surface-secondary)]"
            >
              <Activity className="h-3.5 w-3.5" />
              Running Now
              <ChevronDown className="h-3 w-3" />
            </button>
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded border border-[color:var(--border-secondary)] bg-white text-[color:var(--icon-secondary)] hover:bg-[color:var(--surface-secondary)]"
              title="Export"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded border border-[color:var(--border-secondary)] bg-white text-[color:var(--icon-secondary)] hover:bg-[color:var(--surface-secondary)]"
              title="More"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded border border-[color:var(--border-secondary)] bg-white text-[color:var(--icon-secondary)] hover:bg-[color:var(--surface-secondary)]"
              title="Filters"
            >
              <Filter className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        {/* Stat-card filter strip — mirrors the JFrog Live Assessment pattern */}
        <div className="mb-5 flex flex-wrap gap-2.5">
          <FilterChip
            label="Past SLA"
            count={stats.expired}
            tone="danger"
            active={activeFilter === "critical-issues"}
            onClick={() => setActiveFilter("critical-issues")}
            icon={<Clock className="h-3.5 w-3.5" />}
          />
          <FilterChip
            label="SLA expiring < 30d"
            count={stats.expiringSoon}
            tone="warning"
            icon={<Clock className="h-3.5 w-3.5" />}
          />
          <FilterChip
            label="Malicious package"
            count={stats.malicious}
            tone="danger"
            icon={<ShieldAlert className="h-3.5 w-3.5" />}
          />
          <FilterChip
            label="Integrity drift"
            count={stats.integrity}
            tone="danger"
            icon={<ShieldAlert className="h-3.5 w-3.5" />}
          />
          <FilterChip
            label="Critical CVEs"
            count={stats.criticalCves}
            tone="warning"
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
          />
          <FilterChip
            label="Currently running"
            count={stats.running}
            tone="brand"
            icon={<Activity className="h-3.5 w-3.5" />}
          />
        </div>

        {/* Filter chips row */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-semibold text-[color:var(--text-secondary)]">
            View:
          </span>
          {FILTERS.map((f) => (
            <FilterChipMini
              key={f.id}
              label={f.label}
              count={filterCounts[f.id]}
              active={activeFilter === f.id}
              onClick={() => setActiveFilter(f.id)}
              hint={f.hint}
            />
          ))}
          <button
            type="button"
            className="inline-flex h-7 items-center gap-1 rounded border border-dashed border-[color:var(--border-secondary)] bg-transparent px-2.5 text-[12px] text-[color:var(--text-secondary)] hover:bg-white hover:border-[color:var(--navy-500)]"
          >
            <Plus className="h-3 w-3" />
            Custom view
          </button>
        </div>

        <ReleasesTable releases={filteredReleases} />

        <div className="mt-4 flex items-center justify-between text-[11px] text-[color:var(--text-tertiary)]">
          <span>
            Data sources: <strong className="text-[color:var(--text-secondary)]">Wiz Connector</strong> · Xray · Artifactory · AppTrust
          </span>
          <span>Validation POC — illustrative data only</span>
        </div>
      </div>
    </>
  );
}

function FilterChipMini({
  label,
  count,
  active,
  onClick,
  hint,
}: {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={hint}
      className={
        active
          ? "inline-flex h-7 items-center gap-1.5 rounded border-2 border-[color:var(--navy-600)] bg-white px-2.5 text-[12px] font-semibold text-[color:var(--text-primary)]"
          : "inline-flex h-7 items-center gap-1.5 rounded border border-[color:var(--border-secondary)] bg-white px-2.5 text-[12px] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:border-[color:var(--text-tertiary)]"
      }
    >
      {label}
      {typeof count === "number" && (
        <span className="ml-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-sm bg-[color:var(--surface-tertiary)] px-1 text-[10px] font-semibold text-[color:var(--text-secondary)]">
          {count}
        </span>
      )}
    </button>
  );
}
