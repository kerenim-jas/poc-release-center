import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Badge, Pill } from "@/components/Badge";
import { RELEASES, Release } from "@/lib/fixtures";
import {
  ArrowLeft,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Clock,
  AlertTriangle,
  Skull,
  Bell,
  Download,
  CircleSlash,
  CheckCircle2,
  Server,
  GitBranch,
  Package,
  Zap,
  ExternalLink,
} from "lucide-react";

export function generateStaticParams() {
  return RELEASES.map((r) => ({ id: r.id }));
}

export default async function ReleaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const release = RELEASES.find((r) => r.id === id);
  if (!release) notFound();

  return <ReleaseDetailContent release={release} />;
}

function ReleaseDetailContent({ release }: { release: Release }) {
  const slaTone =
    release.sla.status === "expired"
      ? "danger"
      : release.sla.status === "expiring"
      ? "warning"
      : "success";

  const isRisky =
    release.risks.integrityDrift ||
    release.risks.maliciousPackages > 0 ||
    release.risks.criticalApplicableCves > 0 ||
    release.sla.status === "expired";

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Runtime", href: "#" },
          { label: "Supported Releases", href: "/" },
          { label: `${release.name} ${release.version}` },
        ]}
      />

      {/* Title + key actions */}
      <div className="border-b border-[color:var(--border-primary)] bg-[color:var(--surface-primary)] px-6 py-5">
        <Link
          href="/"
          className="mb-2 inline-flex items-center gap-1.5 text-[12px] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Supported Releases
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-h3 text-[color:var(--text-primary)] text-[22px]">
                {release.name}
              </h1>
              <code className="text-[18px] font-mono font-semibold text-[color:var(--navy-600)]">
                {release.version}
              </code>
              {release.trustedBadge && (
                <Badge tone="brand" icon={<ShieldCheck className="h-3 w-3" />}>
                  Trusted
                </Badge>
              )}
            </div>
            <p className="mt-1 text-[13px] text-[color:var(--text-secondary)]">
              <GitBranch className="inline h-3.5 w-3.5 align-text-bottom mr-1" />
              {release.branch}
              <span className="mx-2 text-[color:var(--text-tertiary)]">·</span>
              {release.team}
              <span className="mx-2 text-[color:var(--text-tertiary)]">·</span>
              Owned by <span className="font-semibold text-[color:var(--text-primary)]">{release.owner}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded border border-[color:var(--border-secondary)] bg-white px-3 text-[12px] font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--surface-secondary)]"
            >
              <Bell className="h-3.5 w-3.5" />
              Configure trigger
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded border border-[color:var(--border-secondary)] bg-white px-3 text-[12px] font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--surface-secondary)]"
            >
              <Download className="h-3.5 w-3.5" />
              Export evidence
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded bg-[color:var(--green-500)] px-3 text-[12px] font-semibold text-white hover:bg-[color:var(--green-500)]/90"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Mark as reviewed
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <KpiTile
            label="SLA"
            value={release.sla.label}
            tone={slaTone}
            icon={<Clock className="h-4 w-4" />}
          />
          <KpiTile
            label="Runtime"
            value={
              release.runtime.status === "running"
                ? `Running on ${release.runtime.clusterCount} cluster${
                    release.runtime.clusterCount > 1 ? "s" : ""
                  }`
                : "Not running"
            }
            tone={release.runtime.status === "running" ? "success" : "neutral"}
            icon={<Activity className="h-4 w-4" />}
          />
          <KpiTile
            label="Risk"
            value={
              release.risks.integrityDrift
                ? "Integrity drift"
                : release.risks.maliciousPackages > 0
                ? "Malicious package"
                : release.risks.criticalApplicableCves > 0
                ? `${release.risks.criticalApplicableCves} critical CVEs`
                : "Healthy"
            }
            tone={isRisky ? "danger" : "success"}
            icon={isRisky ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
          />
          <KpiTile
            label="Usage (30d)"
            value={`${release.usage.downloads30d.toLocaleString()} downloads`}
            tone="info"
            icon={<Download className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-5 px-6 py-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          {/* Risks panel */}
          <Card title="Risk signals" subtitle="What changed since this release was promoted">
            <div className="space-y-3">
              {release.risks.integrityDrift && (
                <RiskRow
                  tone="danger"
                  icon={<ShieldAlert className="h-4 w-4" />}
                  title="Integrity drift detected"
                  description={
                    release.risks.integrityDriftDetail ||
                    "Running image digest differs from the signed release evidence."
                  }
                  meta="Detected via JFrog signature check + Wiz running image SHA"
                  cta="View digest comparison"
                />
              )}
              {release.risks.maliciousPackages > 0 && (
                <RiskRow
                  tone="danger"
                  icon={<Skull className="h-4 w-4" />}
                  title={`${release.risks.maliciousPackages} malicious package${
                    release.risks.maliciousPackages > 1 ? "s" : ""
                  }`}
                  description={release.risks.topRisk.description || "Flagged by JFrog Security Research."}
                  meta="JFrog SR feed · Continuous CVE drift"
                  cta="Open advisory"
                />
              )}
              {release.risks.criticalApplicableCves > 0 && !release.risks.integrityDrift && (
                <RiskRow
                  tone="warning"
                  icon={<AlertTriangle className="h-4 w-4" />}
                  title={`${release.risks.criticalApplicableCves} critical applicable CVE${
                    release.risks.criticalApplicableCves > 1 ? "s" : ""
                  }`}
                  description={release.risks.topRisk.description || "Applicable to this release based on Xray contextual analysis."}
                  meta="Xray applicability + Runtime exposure"
                  cta="View CVE list"
                />
              )}
              {release.sla.status === "expired" && (
                <RiskRow
                  tone="danger"
                  icon={<Clock className="h-4 w-4" />}
                  title="Release is past SLA window"
                  description={`SLA ended ${release.sla.label.toLowerCase()}. This release should have been evicted from supported customer environments.`}
                  meta="AppTrust evidence · Customer contracts"
                  cta="Notify owners"
                />
              )}
              {!release.risks.integrityDrift &&
                release.risks.maliciousPackages === 0 &&
                release.risks.criticalApplicableCves === 0 &&
                release.sla.status !== "expired" && (
                  <div className="flex items-center gap-2 rounded border border-[color:var(--green-500)]/20 bg-[color:var(--green-100)] px-3 py-3 text-[13px] text-[color:var(--green-500)]">
                    <ShieldCheck className="h-4 w-4" />
                    No active risk signals. Release is healthy.
                  </div>
                )}
            </div>
          </Card>

          {/* Runtime panel */}
          <Card
            title="Where it's running"
            subtitle="Live workload visibility — sourced from Wiz running images"
            badge={
              release.runtime.status === "running" ? (
                <Pill tone="success">Live · {release.runtime.lastSeen}</Pill>
              ) : (
                <Pill tone="neutral">Not seen</Pill>
              )
            }
          >
            {release.runtime.status === "not-running" ? (
              <div className="flex items-center gap-2 rounded border border-[color:var(--border-primary)] bg-[color:var(--surface-secondary)] px-3 py-4 text-[13px] text-[color:var(--text-secondary)]">
                <CircleSlash className="h-4 w-4 text-[color:var(--text-tertiary)]" />
                This release has been built and signed but is not deployed to any monitored cluster.
              </div>
            ) : (
              <div className="overflow-hidden rounded border border-[color:var(--border-primary)]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[color:var(--surface-secondary)] text-[11px] font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                      <th className="px-3 py-2">Cluster</th>
                      <th className="px-3 py-2">Workloads</th>
                      <th className="px-3 py-2">Image SHA</th>
                      <th className="px-3 py-2">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {release.runtime.clusters
                      .filter((c) => c !== "...")
                      .map((c, i) => (
                        <tr
                          key={c}
                          className="border-t border-[color:var(--border-primary)] text-[13px]"
                        >
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <Server className="h-3.5 w-3.5 text-[color:var(--icon-tertiary)]" />
                              <span className="text-[color:var(--text-primary)]">{c}</span>
                              {release.risks.integrityDrift && i === 1 && (
                                <Badge tone="danger" size="sm">
                                  Drift
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-[color:var(--text-secondary)]">
                            {Math.max(1, Math.round(Math.random() * 18))} pods
                          </td>
                          <td className="px-3 py-2.5">
                            <code className="text-[11px] text-[color:var(--text-tertiary)]">
                              sha256:{Math.random().toString(16).slice(2, 14)}
                            </code>
                          </td>
                          <td className="px-3 py-2.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)] px-1.5 py-0.5 rounded border border-[color:var(--border-secondary)]">
                              via Wiz
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Triggers panel */}
          <Card
            title="Triggers"
            subtitle="Automated actions configured for this release"
            action={
              <button
                type="button"
                className="inline-flex h-7 items-center gap-1.5 rounded border border-[color:var(--border-secondary)] bg-white px-2.5 text-[12px] font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--surface-secondary)]"
              >
                <Zap className="h-3.5 w-3.5" />
                Add trigger
              </button>
            }
          >
            {release.triggers.configured === 0 ? (
              <div className="rounded border border-dashed border-[color:var(--border-secondary)] px-3 py-6 text-center text-[13px] text-[color:var(--text-secondary)]">
                No triggers configured. Notify owners automatically when SLA expires, drift is detected, or malicious package is found.
              </div>
            ) : (
              <ul className="space-y-2">
                {Array.from({ length: release.triggers.configured }).map((_, i) => {
                  const triggers = [
                    { label: "Notify Slack #release-mgmt on critical CVE", channel: "Slack" },
                    { label: "Open Jira when SLA < 30 days", channel: "Jira" },
                    { label: "Page on integrity drift", channel: "PagerDuty" },
                    { label: "Block deploy of expired versions in CD", channel: "AppTrust" },
                  ];
                  const t = triggers[i % triggers.length];
                  return (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded border border-[color:var(--border-primary)] bg-white px-3 py-2.5 text-[13px]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Zap className="h-3.5 w-3.5 text-[color:var(--green-500)]" />
                        <span className="text-[color:var(--text-primary)]">{t.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge tone="info" size="sm">
                          {t.channel}
                        </Badge>
                        {i < release.triggers.recentFires && (
                          <Badge tone="warning" size="sm">
                            Fired {i + 1}× this week
                          </Badge>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>

        {/* Right column — Trust evidence + metadata */}
        <div className="space-y-5">
          <Card title="Trust evidence" subtitle="AppTrust gate snapshot">
            <ul className="space-y-2.5 text-[13px]">
              <EvidenceItem
                ok={release.appTrustEvidence}
                label="Signed by build pipeline"
                detail="Cosign / Sigstore"
              />
              <EvidenceItem
                ok={release.appTrustEvidence}
                label="SBOM generated"
                detail="CycloneDX 1.5"
              />
              <EvidenceItem
                ok={release.trustedBadge}
                label="Xray scan passed"
                detail="0 blockers at promotion"
              />
              <EvidenceItem
                ok={release.appTrustEvidence}
                label="Approval recorded"
                detail={release.owner}
              />
              <EvidenceItem
                ok={release.trustedBadge}
                label="Promoted via AppTrust"
                detail={release.sourceRepo}
              />
            </ul>
            <div className="mt-3 border-t border-[color:var(--border-primary)] pt-3">
              <Link
                href="#"
                className="inline-flex items-center gap-1 text-[12px] font-semibold text-[color:var(--text-active)] hover:underline"
              >
                View full evidence chain
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </Card>

          <Card title="Release metadata">
            <dl className="space-y-2.5 text-[13px]">
              <Meta label="Source repo" value={release.sourceRepo} mono />
              <Meta label="Branch" value={release.branch} mono />
              <Meta label="Team" value={release.team} />
              <Meta label="Last download" value={release.usage.lastDownload || "—"} />
              <Meta label="Downloads (30d)" value={release.usage.downloads30d.toLocaleString()} />
              <Meta
                label="Runtime data source"
                value="Wiz Connector"
              />
            </dl>
          </Card>

          {release.hypothesisNote && (
            <Card title="Validation note" tone="info">
              <p className="text-[12px] italic text-[color:var(--text-secondary)]">
                <Package className="inline h-3 w-3 mr-1" />
                {release.hypothesisNote}
              </p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function KpiTile({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: string;
  tone: "success" | "warning" | "danger" | "neutral" | "info";
  icon: React.ReactNode;
}) {
  const colors = {
    success: "text-[color:var(--green-500)]",
    warning: "text-[color:var(--orange-500)]",
    danger: "text-[color:var(--red-500)]",
    neutral: "text-[color:var(--text-tertiary)]",
    info: "text-[color:var(--navy-600)]",
  }[tone];
  return (
    <div className="rounded-md border border-[color:var(--border-primary)] bg-[color:var(--surface-secondary)] px-3 py-2.5">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
        {label}
      </div>
      <div className={`mt-1 flex items-center gap-1.5 text-[14px] font-semibold ${colors}`}>
        {icon}
        {value}
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
  badge,
  action,
  tone,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  tone?: "info";
}) {
  return (
    <section
      className={
        tone === "info"
          ? "rounded-md border border-[color:var(--navy-200)] bg-[color:var(--navy-100)] p-4"
          : "rounded-md border border-[color:var(--border-primary)] bg-white p-4"
      }
    >
      <header className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-[14px] font-semibold text-[color:var(--text-primary)]">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-[12px] text-[color:var(--text-secondary)]">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {badge}
          {action}
        </div>
      </header>
      {children}
    </section>
  );
}

function RiskRow({
  tone,
  icon,
  title,
  description,
  meta,
  cta,
}: {
  tone: "danger" | "warning";
  icon: React.ReactNode;
  title: string;
  description: string;
  meta: string;
  cta: string;
}) {
  const cls =
    tone === "danger"
      ? "border-[color:var(--red-200)] bg-[color:var(--red-100)]"
      : "border-[color:var(--orange-500)]/30 bg-[color:var(--orange-100)]";
  const iconCls =
    tone === "danger" ? "text-[color:var(--red-500)]" : "text-[color:var(--orange-500)]";
  return (
    <div className={`rounded border ${cls} p-3`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${iconCls}`}>{icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className={`text-[13px] font-semibold ${iconCls}`}>{title}</h3>
            <button
              type="button"
              className="inline-flex h-6 items-center gap-1 rounded border border-current/20 px-2 text-[11px] font-semibold text-[color:var(--text-primary)] bg-white hover:bg-[color:var(--surface-secondary)]"
            >
              {cta}
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
          <p className="mt-1 text-[13px] text-[color:var(--text-primary)]">{description}</p>
          <p className="mt-1.5 text-[11px] text-[color:var(--text-tertiary)]">{meta}</p>
        </div>
      </div>
    </div>
  );
}

function EvidenceItem({
  ok,
  label,
  detail,
}: {
  ok: boolean;
  label: string;
  detail: string;
}) {
  return (
    <li className="flex items-start gap-2">
      {ok ? (
        <CheckCircle2 className="h-4 w-4 mt-0.5 text-[color:var(--green-500)] flex-shrink-0" />
      ) : (
        <CircleSlash className="h-4 w-4 mt-0.5 text-[color:var(--text-tertiary)] flex-shrink-0" />
      )}
      <div className="flex-1">
        <div className="text-[color:var(--text-primary)]">{label}</div>
        <div className="text-[11px] text-[color:var(--text-tertiary)]">{detail}</div>
      </div>
    </li>
  );
}

function Meta({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[12px] text-[color:var(--text-tertiary)]">{label}</dt>
      <dd
        className={`text-[12px] text-[color:var(--text-primary)] text-right ${
          mono ? "font-mono" : ""
        } truncate`}
        title={value}
      >
        {value}
      </dd>
    </div>
  );
}
