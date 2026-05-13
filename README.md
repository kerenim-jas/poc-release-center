# poc-release-center — v0.1 (SUPERSEDED)

> **Status: superseded.** This was the first iteration of the Supported Release Center concept, designed for an external Release Manager persona based on the JFrog Live Assessment design language.
>
> Following the calls with **Sahar Bracha** (May 10) and **Barak Haryati** (May 13), the persona, data model, and value framing all shifted significantly. The replacement POC is **[poc-supported-release-center](https://github.com/kerenim-jas/poc-supported-release-center)** — built around Barak's actual SSDLC dashboard and Ambarish's CVE×Service matrix as the source of truth.
>
> This repo is preserved as a historical artifact of v0.1 thinking. **Do not validate against this version with new participants.**

## Why this was superseded

- **Persona was wrong.** The right primary personas are Sec Director (Barak), Release Coordinator (Ambarish), and Service Owner (per-Core lead). Not a generic "Release Manager."
- **Data model was wrong.** Real model is Cores → Services → Service Versions → CVEs with SLA timer state, not flat Releases.
- **Runtime tie-in was overstated.** Runtime is one data source feeding the SLA dashboard, not the headline value.
- **Integrity drift was misplaced.** It belongs in the Wiz augmentation POC (JFrog → Wiz direction), not in the JFrog-internal SLA view.
- **The actual product already exists internally.** Barak built ~70% of it as the SSDLC dashboard — the v0.2 POC productizes that pattern.

## Live (still up for reference)

[https://kerenim-jas.github.io/poc-release-center/](https://kerenim-jas.github.io/poc-release-center/) — password `runtime-rm-2026`

## What replaced it

[https://github.com/kerenim-jas/poc-supported-release-center](https://github.com/kerenim-jas/poc-supported-release-center) — see that repo's README for the new product framing.
