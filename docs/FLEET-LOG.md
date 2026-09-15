# Variant wave II — fleet log

Recreated 2026-09-05 per the fleet-discipline rules in coderpuzzle/CLAUDE.md.

## Rate-limit events

- 2026-09-05 ~18:34 UTC — agent "0648 shortest-root-substitution" died:
  429 "Rate limit reached for requests" (per-minute class, concurrency-
  driven). Target was 5 concurrent agents. Response: step target down to
  4 (halve, floor 4); resume the dead agent when a slot frees instead of
  launching fresh. Batch 1 ran 5 concurrent with no 429s, so the pool is
  near its edge at 5.
- 2026-09-05 ~19:05 UTC — agent "0189 roll-the-array-rightward" died: 429,
  same per-minute class. Target was 4 concurrent (already stepped down).
  Agent had finished both file edits; only the JSON sanity check and the
  verify gate remained. Resumed in place. No further step-down (already at
  the floor); events are ~30 min apart, consistent with pool edges rather
  than sustained overload.
- 2026-09-05 ~20:34 UTC — agent "0376 alternating-trend-subsequence" died:
  429, per-minute class, third event. Target 4 concurrent. Agent was still
  in its exemplar-reading phase (no files written). Resumed in place.
  Pattern note: all three events landed on agents in their first minutes,
  when prompt + exemplar reads are heaviest — the burst of large-context
  requests at wave start is what trips the per-minute limit.
- 2026-09-05 ~20:37 UTC — agent "1351 negative-count-in-a-sorted-grid" died:
  429, per-minute class, fourth event, again during the exemplar-reading
  burst (no files written). Resumed in place. Four events inside ~2h with
  4 concurrent agents — the pool is genuinely tighter today than during
  Batch 1. Holding at 4; if a fifth lands, step to 3.
- 2026-09-05 ~20:46 UTC — agent "1588 summing-the-odd-sized-windows" died:
  429, per-minute class, fifth event, again with all writing done ("Now the
  gate."). Resumed in place. Holding at 4 concurrent; the pattern holds —
  deaths cluster at heavy-context moments (reads and gate runs).
- 2026-09-05 ~20:50 UTC — agent "0116 every-nodes-right-hand-neighbor"
  died: 429, sixth event, again mid-read. Events now ~4 min apart — the
  pool is genuinely saturated at 4 concurrent. STEPPING DOWN to 3 per the
  escalation rule recorded earlier: 0116 is held suspended (context
  intact) and resumes when a running agent completes, keeping live
  concurrency at 3.
- 2026-09-05 ~22:01-22:06 UTC — FOUR agents (0692, 0324, 1471, 0094) died
  simultaneously: 1308 "Usage limit reached for 5 hour. Reset 2026-09-06
  01:21:39". This is the POOL class, not the per-minute class — no step-
  down; resumed all four after reset per the discipline. The machine
  slept through the reset window. 0692 died with all 14 files written and
  sections correct, mid-gate; 0324 died while independently confirming
  the output-pin (its numbers: quickselect mismatches 10/24 pinned cases);
  1471 died pre-writing; 0094 died during Rust Morris pre-research (it
  identified the 1080 raw-pointer precedent for back-pointers).

## PROGRAM COMPLETE — 2026-09-06

All 59 authorable roster bundles landed (bank `21e4f7f35`), the
originals mirror deployed (`78bbfd231`): 208 multi-solution adapt
bundles, 211 variants-carrying originals twins, parity verified,
references resolving in both trees. Exclusions stand as documented:
0280/0324 (statement pins) and 1382 (mirror-blocked, same class).
The mirror tooling (`.localonly/mirror_to_originals.py`) encodes the
seven translation lessons; the parity audit
(`.localonly/mirror_parity_audit.py`) is the standing verifier.
