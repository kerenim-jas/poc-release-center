/**
 * Demo data for the Supported Releases Center POC.
 * Each release is intentionally crafted to provoke a validation hypothesis.
 * All names mirror real JFrog product naming + Repo21 (customer zero).
 */

export type RuntimeStatus = "running" | "not-running" | "unknown";
export type SlaStatus = "healthy" | "expiring" | "expired";
export type RiskLevel = "critical" | "warning" | "info" | "healthy";
export type DataSource = "wiz" | "jfrog-sensor" | "kubelet";

export type Release = {
  id: string;
  name: string;
  version: string;
  branch: string;
  sourceRepo: string;
  owner: string;
  team: string;
  trustedBadge: boolean;
  appTrustEvidence: boolean;

  sla: {
    status: SlaStatus;
    endDate: string;
    daysLeft: number;
    label: string;
  };

  runtime: {
    status: RuntimeStatus;
    clusterCount: number;
    clusters: string[];
    dataSource: DataSource;
    lastSeen: string;
  };

  risks: {
    criticalApplicableCves: number;
    maliciousPackages: number;
    integrityDrift: boolean;
    integrityDriftDetail?: string;
    topRisk: { level: RiskLevel; label: string; description?: string };
  };

  usage: {
    lastDownload?: string;
    downloads30d: number;
  };

  triggers: {
    configured: number;
    recentFires: number;
  };

  hypothesisNote?: string;
};

export const RELEASES: Release[] = [
  // H1, H2, H6 — happy-path latest version, "Trusted" badge from gate
  {
    id: "artifactory-svc-7-84-12",
    name: "artifactory-svc",
    version: "7.84.12",
    branch: "release/7.84",
    sourceRepo: "jfrog-releases-docker-local",
    owner: "Sahar K.",
    team: "Artifactory Core",
    trustedBadge: true,
    appTrustEvidence: true,
    sla: { status: "healthy", endDate: "2027-06-15", daysLeft: 405, label: "13mo left" },
    runtime: {
      status: "running",
      clusterCount: 12,
      clusters: ["prod-us-east", "prod-eu-west", "prod-apac", "..."],
      dataSource: "wiz",
      lastSeen: "2 min ago",
    },
    risks: {
      criticalApplicableCves: 0,
      maliciousPackages: 0,
      integrityDrift: false,
      topRisk: { level: "healthy", label: "Healthy" },
    },
    usage: { lastDownload: "12 min ago", downloads30d: 8421 },
    triggers: { configured: 3, recentFires: 0 },
    hypothesisNote: "Happy path — establishes the baseline.",
  },

  // H4 — SLA expiring soon, draws the eye
  {
    id: "artifactory-svc-7-83-5",
    name: "artifactory-svc",
    version: "7.83.5",
    branch: "release/7.83",
    sourceRepo: "jfrog-releases-docker-local",
    owner: "Sahar K.",
    team: "Artifactory Core",
    trustedBadge: true,
    appTrustEvidence: true,
    sla: { status: "expiring", endDate: "2026-06-04", daysLeft: 28, label: "28d left" },
    runtime: {
      status: "running",
      clusterCount: 4,
      clusters: ["prod-eu-west", "prod-us-east", "customer-on-prem-acme", "customer-on-prem-globex"],
      dataSource: "wiz",
      lastSeen: "5 min ago",
    },
    risks: {
      criticalApplicableCves: 1,
      maliciousPackages: 0,
      integrityDrift: false,
      topRisk: {
        level: "warning",
        label: "1 critical CVE",
        description: "CVE-2026-31420 in libcurl — patched in 7.84.x",
      },
    },
    usage: { lastDownload: "1 hour ago", downloads30d: 3204 },
    triggers: { configured: 2, recentFires: 1 },
    hypothesisNote: "Provokes SLA conversation — does the 28d countdown draw their eye?",
  },

  // H4 — SLA EXPIRED but still running. The gold-standard validation moment.
  {
    id: "xray-indexer-3-93-2",
    name: "xray-indexer",
    version: "3.93.2",
    branch: "release/3.93",
    sourceRepo: "jfrog-releases-docker-local",
    owner: "Nurit G.",
    team: "Xray",
    trustedBadge: true,
    appTrustEvidence: false,
    sla: { status: "expired", endDate: "2026-04-12", daysLeft: -25, label: "Expired 25d ago" },
    runtime: {
      status: "running",
      clusterCount: 2,
      clusters: ["customer-on-prem-tandem", "customer-on-prem-itergo"],
      dataSource: "wiz",
      lastSeen: "12 min ago",
    },
    risks: {
      criticalApplicableCves: 2,
      maliciousPackages: 0,
      integrityDrift: false,
      topRisk: {
        level: "critical",
        label: "Expired + 2 critical CVEs",
        description: "Customer is 25 days past SLA window — should have been auto-evicted",
      },
    },
    usage: { lastDownload: "3 days ago", downloads30d: 12 },
    triggers: { configured: 1, recentFires: 4 },
    hypothesisNote: "GOLD validator — expired but still running. Auto-evict policy moment.",
  },

  // H3, H6 — Integrity drift = JFrog's unique value vs CNAPP
  {
    id: "repo21-payment-2-1-0",
    name: "repo21-payment-service",
    version: "2.1.0",
    branch: "main",
    sourceRepo: "repo21-docker-prod-local",
    owner: "Tomri D.",
    team: "Repo21 Payments",
    trustedBadge: true,
    appTrustEvidence: true,
    sla: { status: "healthy", endDate: "2027-02-01", daysLeft: 271, label: "9mo left" },
    runtime: {
      status: "running",
      clusterCount: 3,
      clusters: ["repo21-prod-us", "repo21-prod-eu", "repo21-staging"],
      dataSource: "wiz",
      lastSeen: "1 min ago",
    },
    risks: {
      criticalApplicableCves: 0,
      maliciousPackages: 0,
      integrityDrift: true,
      integrityDriftDetail: "Image digest in cluster 'repo21-prod-eu' differs from signed release",
      topRisk: {
        level: "critical",
        label: "Integrity drift detected",
        description: "Running image was modified after release — supply chain alert",
      },
    },
    usage: { lastDownload: "47 min ago", downloads30d: 1842 },
    triggers: { configured: 4, recentFires: 1 },
    hypothesisNote: "JFrog's unique value moment — integrity drift no CNAPP can detect alone.",
  },

  // H3 — Critical CVE running across many clusters
  {
    id: "repo21-frontend-1-9-7",
    name: "repo21-frontend",
    version: "1.9.7",
    branch: "main",
    sourceRepo: "repo21-docker-prod-local",
    owner: "Tomri D.",
    team: "Repo21 Frontend",
    trustedBadge: true,
    appTrustEvidence: true,
    sla: { status: "healthy", endDate: "2026-12-20", daysLeft: 228, label: "7.5mo left" },
    runtime: {
      status: "running",
      clusterCount: 7,
      clusters: ["repo21-prod-us", "repo21-prod-eu", "repo21-prod-apac", "repo21-staging", "..."],
      dataSource: "wiz",
      lastSeen: "30 sec ago",
    },
    risks: {
      criticalApplicableCves: 3,
      maliciousPackages: 0,
      integrityDrift: false,
      topRisk: {
        level: "critical",
        label: "3 critical CVEs",
        description: "log4j-style — running on 7 clusters",
      },
    },
    usage: { lastDownload: "2 hours ago", downloads30d: 5121 },
    triggers: { configured: 2, recentFires: 2 },
    hypothesisNote: "Trigger urgency — would they configure auto-notify for this scenario?",
  },

  // H3 — Malicious package — the "fix yesterday" scenario
  {
    id: "repo21-data-pipeline-4-2-1",
    name: "repo21-data-pipeline",
    version: "4.2.1",
    branch: "main",
    sourceRepo: "repo21-docker-prod-local",
    owner: "Ravit S.",
    team: "Repo21 Data",
    trustedBadge: false,
    appTrustEvidence: false,
    sla: { status: "healthy", endDate: "2027-01-15", daysLeft: 254, label: "8mo left" },
    runtime: {
      status: "running",
      clusterCount: 2,
      clusters: ["repo21-prod-us", "repo21-prod-eu"],
      dataSource: "wiz",
      lastSeen: "8 min ago",
    },
    risks: {
      criticalApplicableCves: 0,
      maliciousPackages: 1,
      integrityDrift: false,
      topRisk: {
        level: "critical",
        label: "Malicious package",
        description: "ua-parser-js variant flagged by JFrog SR — fix immediately",
      },
    },
    usage: { lastDownload: "30 min ago", downloads30d: 982 },
    triggers: { configured: 1, recentFires: 1 },
    hypothesisNote: "Malicious = differentiator vs CNAPP, requires JFrog SR intelligence.",
  },

  // H1, H6 — built but not running anywhere — "is it used" dimension
  {
    id: "xray-policy-engine-5-4-1",
    name: "xray-policy-engine",
    version: "5.4.1",
    branch: "release/5.4",
    sourceRepo: "jfrog-releases-docker-local",
    owner: "Nurit G.",
    team: "Xray",
    trustedBadge: true,
    appTrustEvidence: true,
    sla: { status: "healthy", endDate: "2027-03-30", daysLeft: 327, label: "10.5mo left" },
    runtime: {
      status: "not-running",
      clusterCount: 0,
      clusters: [],
      dataSource: "wiz",
      lastSeen: "Never seen",
    },
    risks: {
      criticalApplicableCves: 0,
      maliciousPackages: 0,
      integrityDrift: false,
      topRisk: { level: "info", label: "Not deployed" },
    },
    usage: { lastDownload: "14 days ago", downloads30d: 3 },
    triggers: { configured: 0, recentFires: 0 },
    hypothesisNote: "Built but dark — does the RM care? Validates 'Is it Running' dimension.",
  },

  // H1 — multiple clusters, healthy, just to add table density
  {
    id: "artifactory-svc-7-82-1",
    name: "artifactory-svc",
    version: "7.82.1",
    branch: "release/7.82",
    sourceRepo: "jfrog-releases-docker-local",
    owner: "Sahar K.",
    team: "Artifactory Core",
    trustedBadge: true,
    appTrustEvidence: true,
    sla: { status: "healthy", endDate: "2026-12-01", daysLeft: 209, label: "7mo left" },
    runtime: {
      status: "running",
      clusterCount: 6,
      clusters: ["customer-on-prem-acme", "customer-on-prem-globex", "..."],
      dataSource: "wiz",
      lastSeen: "1 min ago",
    },
    risks: {
      criticalApplicableCves: 0,
      maliciousPackages: 0,
      integrityDrift: false,
      topRisk: { level: "healthy", label: "Healthy" },
    },
    usage: { lastDownload: "20 min ago", downloads30d: 4520 },
    triggers: { configured: 3, recentFires: 0 },
  },

  // H3 — older xray version still running across customers
  {
    id: "xray-indexer-3-94-0",
    name: "xray-indexer",
    version: "3.94.0",
    branch: "release/3.94",
    sourceRepo: "jfrog-releases-docker-local",
    owner: "Nurit G.",
    team: "Xray",
    trustedBadge: true,
    appTrustEvidence: true,
    sla: { status: "healthy", endDate: "2027-04-22", daysLeft: 350, label: "11.5mo left" },
    runtime: {
      status: "running",
      clusterCount: 9,
      clusters: ["prod-us-east", "prod-eu-west", "..."],
      dataSource: "wiz",
      lastSeen: "1 min ago",
    },
    risks: {
      criticalApplicableCves: 0,
      maliciousPackages: 0,
      integrityDrift: false,
      topRisk: { level: "healthy", label: "Healthy" },
    },
    usage: { lastDownload: "5 min ago", downloads30d: 6240 },
    triggers: { configured: 2, recentFires: 0 },
  },
];

/* Filter presets — these are the validation hypothesis for FR-5 */
export type FilterId = "latest-3-per-branch" | "under-sla" | "critical-issues" | "running-prod" | "all";

export const FILTERS: { id: FilterId; label: string; hint: string; default?: boolean }[] = [
  { id: "latest-3-per-branch", label: "My latest 3 versions per branch", hint: "Default — what most RMs care about", default: true },
  { id: "under-sla", label: "Under SLA", hint: "Versions still contractually supported" },
  { id: "critical-issues", label: "Critical issues", hint: "Anything red in your supported releases" },
  { id: "running-prod", label: "Currently running in production", hint: "Live workloads via Wiz / JFrog sensor" },
  { id: "all", label: "All releases", hint: "Show everything" },
];

export function applyFilter(releases: Release[], filterId: FilterId): Release[] {
  switch (filterId) {
    case "latest-3-per-branch": {
      const byBranch: Record<string, Release[]> = {};
      releases.forEach((r) => {
        const k = `${r.name}::${r.branch}`;
        (byBranch[k] = byBranch[k] || []).push(r);
      });
      const top3: Release[] = [];
      Object.values(byBranch).forEach((list) => {
        list
          .sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }))
          .slice(0, 3)
          .forEach((r) => top3.push(r));
      });
      return top3;
    }
    case "under-sla":
      return releases.filter((r) => r.sla.status !== "expired");
    case "critical-issues":
      return releases.filter(
        (r) =>
          r.risks.topRisk.level === "critical" ||
          r.sla.status === "expired" ||
          r.risks.integrityDrift
      );
    case "running-prod":
      return releases.filter((r) => r.runtime.status === "running");
    case "all":
    default:
      return releases;
  }
}

export const CURRENT_USER = {
  name: "Sahar K.",
  role: "Release Manager",
  team: "Artifactory Core",
  scope: "All JFrog & Repo21 releases",
};
