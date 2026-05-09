# Release Manager Validation — Interview Script

A non-leading interview script for validating the **Supported Releases Center** POC with Release Managers.

> **Why this matters:** The #1 mistake in product validation is asking *"would you find X useful?"* People will say yes to almost anything in a friendly interview. To get real signal, you need to (a) discover their actual workflow before they see the POC, and (b) watch their behavior with the POC in silence rather than narrating it for them.

---

## Before the call

- **Block 45 minutes.** Aim for 35 min content + 10 min buffer.
- **Record audio with consent** ("Mind if I record so I can focus on what you're saying instead of taking notes?"). Use Otter, Zoom, Granola, etc.
- **Have a notetaker** if possible — frees you to listen.
- **Don't send the POC link in advance.** First reactions are gold.
- **Have the POC open** in a tab you can share. **Access password:** `runtime-rm-2026`
  - Home — [https://kerenim-jas.github.io/poc-release-center/](https://kerenim-jas.github.io/poc-release-center/)
  - Integrity drift — [https://kerenim-jas.github.io/poc-release-center/releases/repo21-payment-2-1-0/](https://kerenim-jas.github.io/poc-release-center/releases/repo21-payment-2-1-0/)
  - SLA expired but still running — [https://kerenim-jas.github.io/poc-release-center/releases/xray-indexer-3-93-2/](https://kerenim-jas.github.io/poc-release-center/releases/xray-indexer-3-93-2/)
  - Malicious package — [https://kerenim-jas.github.io/poc-release-center/releases/repo21-data-pipeline-4-2-1/](https://kerenim-jas.github.io/poc-release-center/releases/repo21-data-pipeline-4-2-1/)
  - Built but not running — [https://kerenim-jas.github.io/poc-release-center/releases/xray-policy-engine-5-4-1/](https://kerenim-jas.github.io/poc-release-center/releases/xray-policy-engine-5-4-1/)
- **Print the hypotheses sheet** (bottom of this doc) to fill in after the call.

---

## Phase 1 — Warm-up (3 min)

**Goal:** Build rapport, set expectations, lower their guard.

> "Thanks for the time. Quick framing: I'm exploring an idea around release management and I want your honest reactions — including everything that's confusing, missing, or wrong. There are no right or wrong answers, and I'm not married to any of this. I'll mostly listen. Sound good?"

> "Before I show you anything — tell me a bit about your role. How long have you been a Release Manager? What does your team look like?"

---

## Phase 2 — Discovery: Their World Today (12 min)

**Goal:** Understand their real workflow *before* anchoring on our solution. **Critical:** do not show the POC yet.

Ask broad → narrow. Use **silence** after each question. Wait at least 5 seconds before rephrasing.

| # | Question | What you're listening for |
|---|---|---|
| 2.1 | "Walk me through what your week looks like, especially around a release." | Where do they spend time? What's manual? |
| 2.2 | "Tell me about the last release you managed end-to-end. What went well? What didn't?" | Recent, concrete behavior > abstract opinions |
| 2.3 | "When something goes wrong with a release after it ships, how do you find out?" | The "is it running, is anything wrong" gap |
| 2.4 | "Once a version is in production, how do you keep track of who's still on it?" | Whether "is it used" / "is it running" matters to them organically |
| 2.5 | "What information do you wish you had about your releases that you don't have today?" | Their stated gaps — note exact wording |
| 2.6 | "What tools do you use today for this?" → [pause] → "What do you like about them? What frustrates you?" | Competitive baseline + emotional friction |
| 2.7 | "How do you think about SLAs / supported versions today? Who decides what's still supported?" | Whether SLA framing matches their mental model |

**Anti-pattern alert** — Do NOT in this phase:
- ❌ Mention "runtime", "Wiz", "drift", "trust", or any feature name
- ❌ Lead with "do you ever wish you knew if X was running in production?"
- ❌ Fix their problems for them ("oh you'd love what we built")
- ❌ Fill silence with your own examples

If they bring up things our POC addresses **on their own**, that's huge signal — note exact words.

---

## Phase 3 — First Reaction (5 min)

**Goal:** Capture unprompted understanding of the POC. This is the most diagnostic moment of the call. Be silent.

> "OK, I'm going to share my screen. Just look at it for a moment — I'm not going to explain anything yet."

[Share home screen. **Stay silent for at least 30 seconds**. Watch where their cursor goes, what they squint at.]

> "Take your time. When you're ready — what do you think this is?"

Then in order, with pauses between:

| # | Question | Listen for |
|---|---|---|
| 3.1 | "What do you think this is?" | Do they get the concept without help? |
| 3.2 | "Who do you think this is for?" | Do they recognize the persona = themselves? |
| 3.3 | "What stands out to you on this screen?" | What do their eyes go to first? |
| 3.4 | "What's confusing? What feels wrong?" | Real friction surfaces here |

**Anti-pattern alert:**
- ❌ Don't explain a feature when they hesitate. Let them be confused. Confusion is data.
- ❌ Don't say "what we're showing here is..." — let them tell *you*.

---

## Phase 4 — Think-Aloud Walkthrough (8 min)

**Goal:** Watch them use it. The think-aloud protocol: they narrate their thoughts as they explore; you stay silent.

> "I'd like you to imagine you just sat down at your desk on a Monday morning. Where would you click first? Tell me what you're thinking as you go."

[Stay silent. Let them click anywhere. If they ask "what does this do?" → reflect: *"What do you think it does?"*]

After they've explored on their own for 2-3 minutes, probe with these:

| # | Question | What it tests |
|---|---|---|
| 4.1 | [Point to a count/badge] "What does this number mean to you?" | Is the metric self-explanatory? |
| 4.2 | [Point to a filter chip] "When would you use this view?" | Is the filter framing useful? |
| 4.3 | "What do you expect to happen if you click here?" → [let them click] → "Did that match your expectation?" | Affordance / expectation mismatch |
| 4.4 | "Walk me through one row from left to right. What is it telling you?" | Information hierarchy |
| 4.5 | "Is anything missing from this row that you'd want to see?" | Field completeness |

---

## Phase 5 — Scenario Drill-Down (10 min)

**Goal:** Test the core hypotheses with concrete scenarios. Pick 2-3 max, not all four.

For each scenario, click the row to open the detail page, then ask in this exact order:

> "Take a look at this for a moment. What do you see?"  
> [Pause]  
> "What do you think happened?"  
> [Pause]  
> "If you saw this on a Tuesday morning, what would you do?"  
> [Pause]  
> "How urgent does this feel — 1 to 5?"  
> [Pause]  
> "Who would you contact, and how?"

### Scenario A — Past SLA but still running
- Open: `xray-indexer 3.93.2` (expired 25d ago, running on 2 customer clusters)
- Tests: Do they immediately understand the contradiction? Does it provoke a "who do I tell" response?

### Scenario B — Integrity drift
- Open: `repo21-payment-service 2.1.0` (signed image differs from running image in one cluster)
- Tests: Do they grasp drift without the term being explained? Is the JFrog-vs-CNAPP differentiator clear?

### Scenario C — Malicious package found
- Open: `repo21-data-pipeline 4.2.1`
- Tests: Time-to-action. Do they trust JFrog SR as the source?

### Scenario D — Built but not running anywhere
- Open: `xray-policy-engine 5.4.1`
- Tests: Do they care? This validates the "is it used" dimension. If they shrug, it's a meaningful negative result.

---

## Phase 6 — Workflow Fit (5 min)

**Goal:** Understand whether this becomes part of their workflow, and how.

| # | Question | Listen for |
|---|---|---|
| 6.1 | "How does this compare to how you handle this today?" | Is it 10x better, or marginal? |
| 6.2 | "If this existed tomorrow exactly as it is now, would you use it? How often?" | Frequency = stickiness |
| 6.3 | "What would you NOT use this for?" | Boundaries reveal real use cases |
| 6.4 | "What would have to be true for this to be valuable enough to pay for / push your team to adopt?" | The price-of-entry features |
| 6.5 | "Who else on your team would use this, and for what?" | Persona expansion clue |

---

## Phase 7 — Close (3 min)

| # | Question | Listen for |
|---|---|---|
| 7.1 | "If you could change one thing about this, what would it be?" | Highest-friction change |
| 7.2 | "What's missing that would be a deal-breaker?" | Must-haves vs nice-to-haves |
| 7.3 | "Is there anything I didn't ask that I should have?" | Their meta-feedback |
| 7.4 | "Who else inside your org or among your peers should I talk to?" | Snowball recruiting |
| 7.5 | "Would it be OK if I follow up with another short call once we've evolved this?" | Future access |

---

## Phrasing cheat-sheet — leading vs non-leading

| ❌ Leading | ✅ Non-leading |
|---|---|
| "Do you find this helpful?" | "What would you do with this?" |
| "Don't you think this would save time?" | "How does this compare to what you do today?" |
| "Would you want a feature that notifies you when SLA expires?" | "When something goes wrong after release, how do you find out today?" |
| "How would you feel about runtime visibility?" | "Once a version is in production, how do you keep track of who's still on it?" |
| "Is the SLA badge clear?" | "What does this badge mean to you?" |
| "Wouldn't this be useful for a Release Manager?" | "Who do you think this is for?" |
| "We integrated with Wiz — does that make sense?" | "What do you think 'via Wiz' means here?" |
| "Would you click this button?" | "What do you expect happens if you click here?" |

---

## Hypothesis tracker — fill in after each call

Print and use one per interview. After 5 RMs, patterns emerge.

| # | Hypothesis | What we expected | What they said (verbatim) | Confidence ↑↓→ |
|---|---|---|---|---|
| H1 | RMs care about "is the version still running" — not just "did we ship it" | They organically mention this in Phase 2 | | |
| H2 | SLA framing matches how they think about supported versions | They use the word "SLA" or equivalent unprompted | | |
| H3 | Integrity drift signal is novel and they immediately want to act | Visible reaction; "what do you mean it changed?" | | |
| H4 | Past-SLA-but-still-running scenario provokes urgent action response | They escalate / ask "who would I call" | | |
| H5 | Malicious package signal is trusted and actionable | They believe JFrog SR; assign owner clearly | | |
| H6 | "Built but not running" is meaningful information to them | They have a use for it (cleanup, decommission) | | |
| H7 | Saved-view filters match views they'd build themselves | They understand each view without help | | |
| H8 | Trust evidence (AppTrust panel) is valued, not noise | They look at it; reference it in scenarios | | |
| H9 | Triggers / automations are something they'd configure | They mention notifications/alerts in workflow today | | |
| H10 | Wiz as a runtime data source is acceptable (vs requiring JFrog sensor) | They don't push back on "via Wiz" tag | | |

---

## After the call (do this within 24 hours)

1. **Write down the most surprising thing they said.** That's where the real signal lives.
2. **Update the hypothesis tracker.** Don't wait — memory fades fast.
3. **Capture exact phrases** — they're gold for messaging and future PRDs.
4. **Add follow-up questions** for the next interview based on gaps you noticed.
5. **Don't pivot the design after one call.** Wait for 3-5 calls before drawing conclusions.

---

## Recruiting target — who to interview

Aim for **5-7 Release Managers** across these segments:

- 2-3 from existing customers (named accounts known to the PM)
- 1-2 internal (Release Managers inside the company shipping our own releases)
- 1-2 from non-customer prospects (cold outreach via PMM if available)
- Bonus: 1 DevOps Lead and 1 SRE who works adjacent to a Release Manager — to triangulate

Avoid talking only to internal champions in the first batch — friendly bias will inflate signal.
