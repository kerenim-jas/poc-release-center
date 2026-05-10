# Release Manager — Focused Question List

A scannable, ready-to-use list of questions for a 35-minute RM validation call. Print this and have it open during the interview. The full interview script with framing, anti-patterns, and the hypothesis tracker lives in [`validation-script.md`](./validation-script.md) — this file is the question-only quick reference.

> **Live POC:** [https://kerenim-jas.github.io/poc-release-center/](https://kerenim-jas.github.io/poc-release-center/) · password `runtime-rm-2026`

---

## Phase 1 — Warm-up (3 min)

1. Tell me a bit about your role. How long have you been a Release Manager?
2. What does your team look like — who's around you?
3. What kind of products / releases do you ship? Internal-only, customer-facing, or both?

---

## Phase 2 — Discovery: their world today (12 min)

> **Do not show the POC yet.** This is the most important phase. Use silence.

4. Walk me through what your week looks like, especially around a release.
5. Tell me about the last release you managed end-to-end. What went well? What didn't?
6. When something goes wrong with a release after it ships, how do you find out?
7. Once a version is in production, how do you keep track of who's still on it?
8. What information do you wish you had about your releases that you don't have today?
9. What tools do you use today for this?
   - *(pause)* What do you like about them?
   - *(pause)* What frustrates you?
10. How do you think about SLAs / supported versions today? Who decides what's still supported?
11. When you ship a release, is it usually a single thing (one container, one binary) or a bundle of things (multiple services, charts, configs)?

> Listen for whether they bring up runtime / drift / "is it still running" without prompting. That's gold.

---

## Phase 3 — First reaction (5 min)

> Share screen. **Stay silent for 30+ seconds.** Then ask:

12. Just look at this for a moment without me explaining anything. *(wait)* What do you think this is?
13. Who do you think this is for?
14. What stands out to you on this screen?
15. What's confusing? What feels wrong?

---

## Phase 4 — Think-aloud walkthrough (8 min)

> Hand them control. Stay silent. If they ask "what does this do?" — reflect: *"What do you think it does?"*

16. Imagine you just sat down at your desk on a Monday morning. Where would you click first? Tell me what you're thinking as you go.
17. *(point to a count badge)* What does this number mean to you?
18. *(point to a filter chip)* When would you use this view?
19. What do you expect to happen if you click here? *(let them click)* Did that match your expectation?
20. Walk me through one row from left to right. What is it telling you?
21. Is anything missing from this row that you'd want to see?

---

## Phase 5 — Scenario drill-down (10 min)

> Pick **2-3 scenarios max**, not all four. For each one: open the URL, then ask the questions in order, with pauses between each.

### Scenario A — Past SLA but still running
**URL:** [xray-indexer 3.93.2](https://kerenim-jas.github.io/poc-release-center/releases/xray-indexer-3-93-2/) (expired 25d ago, still running on 2 customer clusters)

22. Take a look at this for a moment. What do you see?
23. What do you think happened?
24. If you saw this on a Tuesday morning, what would you do?
25. How urgent does this feel — 1 to 5?
26. Who would you contact, and how?

### Scenario B — Integrity drift
**URL:** [repo21-payment-service 2.1.0](https://kerenim-jas.github.io/poc-release-center/releases/repo21-payment-2-1-0/) (running image differs from signed image in one cluster)

> Repeat the same five questions (22–26).

### Scenario C — Malicious package found
**URL:** [repo21-data-pipeline 4.2.1](https://kerenim-jas.github.io/poc-release-center/releases/repo21-data-pipeline-4-2-1/)

> Repeat the same five questions (22–26).

### Scenario D — Built but never deployed
**URL:** [xray-policy-engine 5.4.1](https://kerenim-jas.github.io/poc-release-center/releases/xray-policy-engine-5-4-1/)

> Repeat the same five questions (22–26). If they shrug or skip it — that's also a meaningful result.

---

## Phase 6 — Workflow fit (5 min)

27. How does this compare to how you handle this today?
28. If this existed tomorrow exactly as it is now, would you use it? *(if yes)* How often?
29. What would you NOT use this for?
30. What would have to be true for this to be valuable enough to push your team to adopt?
31. Who else on your team would use this, and for what?

---

## Phase 7 — Bundle / Application-level signal (3 min) — NEW

> This phase tests whether the Phase 2 (AppTrust Application-level rollup) investment is justified. Even though the POC only shows Docker today, the answers here shape the Phase 2 roadmap.

32. In your world, when you say "a release," do you usually mean **one Docker image**, or **a bundle of things shipped together** (multiple services, charts, configs)?
33. *(if bundle)* Today, when you look at a release, how do you check the status of all the pieces? Is that easy or annoying?
34. Hypothetically — if this view could group things into bundles (one row per Application Version, with each row rolling up several Docker images / Helm charts / etc.), would that be more useful, less useful, or about the same as one row per image?
35. Have you used JFrog's **AppTrust** (or the Application Lifecycle / Stages Board / Blast Radius views)? *(if yes)* How would you want this runtime view to connect with that?
36. If you could see one runtime overlay anywhere in the JFrog UI, where would you want it? On the Application page? On the Release Lifecycle board? On the Package page? Somewhere else?

---

## Phase 8 — Close (3 min)

37. If you could change one thing about this, what would it be?
38. What's missing that would be a deal-breaker for you?
39. Is there anything I didn't ask that I should have?
40. Who else inside your org or among your peers should I talk to?
41. Would it be OK if I follow up with another short call once we've evolved this?

---

## Quick reference — leading vs non-leading

| ❌ Don't ask | ✅ Ask instead |
|---|---|
| "Do you find this helpful?" | "What would you do with this?" |
| "Don't you think this would save time?" | "How does this compare to what you do today?" |
| "Would you want SLA notifications?" | "When something goes wrong after a release, how do you find out today?" |
| "How would you feel about runtime visibility?" | "Once a version is in production, how do you keep track of who's still on it?" |
| "Is this badge clear?" | "What does this badge mean to you?" |
| "Wouldn't this be useful for an RM?" | "Who do you think this is for?" |
| "We integrated with Wiz — does that make sense?" | "What do you think 'via Wiz' means here?" |
| "Would you want Application-level grouping?" | "When you say 'a release,' do you mean one image or a bundle?" |

---

## After the call — do this within 24 hours

1. Write down the **most surprising thing** they said (where the real signal lives).
2. Update the [hypothesis tracker](./validation-script.md#hypothesis-tracker--fill-in-after-each-call) — memory fades fast.
3. Capture **exact phrases** they used. They're gold for messaging.
4. **Don't pivot the design after one call.** Wait for 3-5 calls before drawing conclusions.

---

## Total time budget

| Phase | Minutes | Cumulative |
|---|---|---|
| 1. Warm-up | 3 | 3 |
| 2. Discovery (no POC yet) | 12 | 15 |
| 3. First reaction | 5 | 20 |
| 4. Think-aloud walkthrough | 8 | 28 |
| 5. Scenario drill-down (2-3 scenarios) | 10 | 38 |
| 6. Workflow fit | 5 | 43 |
| 7. Bundle / Application-level | 3 | 46 |
| 8. Close | 3 | 49 |
| **Buffer** | 6 | 55 |

**Block 60 minutes.** Aim to wrap content in 49.
