# Solutions — Maximize Active Section with Trade II

## Clipped zero-run pairs under a range-maximum table

Segment `s` once into maximal runs and keep only the zero runs, as parallel
start/length arrays. A trade is always the merged flip: zeroing a `'1'` run
that sits between two zero runs and flipping the fused block turns exactly
those two neighboring zero runs into active sections, so for a query window
the gain over the baseline `ones(s)` is the in-window part of one zero run
plus the in-window part of the next. A window that clips a zero run at its
edge simply shortens that run's contribution — only the two pairs touching
the clipped boundary runs need special handling, and every pair strictly
inside the window is exact.

The exact pairs are the sums `lens[k] + lens[k+1]`, so a sparse table over
those sums answers the interior maximum in constant time. Binary search
locates the first zero run ending at or after `l` and the last one starting
at or before `r`; the pairs between them are exactly the legal trades, with
the two boundary pairs computed directly from their clipped lengths. Each
query then costs two binary searches plus constant work, and the answer is
`ones(s)` plus the best gain, or just `ones(s)` when no legal trade exists.

![On s = "0100" the zero runs have lens [1, 2] with pair sum 1 + 2 = 3; query [0,3] takes that range max for 1 + 3 = 4 while [0,2] repairs its clipped boundary pair to 1 + 1 = 2 for 3 and the single-run windows stay at 1 — answers 4, 3, 1, 1.](figures/solution-clipped-zero-run-pairs.svg)

**Complexity:** `O(n + q log n)` time, `O(n log n)` space.
