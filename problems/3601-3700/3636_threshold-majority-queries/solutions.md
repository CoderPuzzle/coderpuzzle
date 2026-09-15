# Solutions — Threshold Majority Queries

## Block-decomposition mode tables

The tie-break lets every query collapse to a single lookup. The element with
the overall highest frequency in `nums[li..ri]` — the smallest one when
several tie — matches or beats every other element, so it satisfies
`thresholdi` exactly when some element does: each answer is just that top
element and its frequency compared once against the threshold.

Rank-compress the values to `0..m-1` so "smaller value" becomes "smaller
rank", and record `occ[r]`, the sorted positions of rank `r`. Split the array
into blocks of size `b` and precompute, for every pair of blocks `(i, j)`, the
highest frequency inside `nums[block i start..block j end]` and the smallest
rank attaining it. One sweep per left block does all pairs: extend a
rank-count array over the growing window — additions only — so each element
costs `O(1)`; a count that raises the maximum resets the smallest-mode rank,
a count that merely equals it lowers the rank, and both stay correct because
frequencies never decrease while the sweep only grows.

Each query then joins one table cell with a short fringe. The blocks wholly
inside `[li..ri]` contribute their precomputed pair; the at most `2b` fringe
elements are deduplicated and each distinct rank's true frequency in the
range comes from two binary searches over `occ[r]`; the best
`(frequency, smallest rank)` among the table entry and the verified fringes
answers the query whenever its frequency clears `thresholdi`. Balancing the
sweep against the fringes picks `b ≈ n / sqrt(q)`.

**Complexity:** `O(n * sqrt(q) * log n)` time, `O(n + q)` space.
