# Solutions — Kth Ancestor of a Tree Node

## Binary lifting (sparse ancestor table)

The naive query walks up one edge at a time, which on a chain of `5 * 10⁴` nodes costs the full depth per call — `2.5 * 10⁹` steps across the query budget. The fix is to pay once in the constructor for a table that makes each query logarithmic.

**The table.** `up[j][v]` is the 2ʲ-th ancestor of `v`, or `-1` when that jump runs off the top of the tree. Row 0 is the parent array itself. Row `j` comes from row `j - 1` by composing the jump with itself — the 2ʲ-th ancestor of `v` is the 2ʲ⁻¹-th ancestor of `up[j-1][v]` — with `-1` absorbing: once a jump leaves the tree, every longer jump does too. The table needs `levels = ⌈log₂(n + 1)⌉` rows, chosen so `2^levels > n ≥ k`, which is exactly enough to express any legal `k` in binary. Building it is one pass per row: `O(n log n)` time and the same space.

**The query.** Write `k` in binary and take one stored jump per set bit: `k = 13 = 1101₂` becomes a jump of 8, then 4, then 1. The order does not matter because the jumps compose. The loop stops the moment the current node becomes `-1` — the path ran past the root, so the answer is `-1` — and a `k` too large to fit in `levels` bits is rejected up front. That is at most `⌈log₂ n⌉ ≈ 16` array reads per query at the stated limits, against up to `5 * 10⁴` for the naive climb.

**Why the `-1` sentinel is enough.** Nothing tracks depths. A node's depth is implicit: the first jump that overshoots the root writes `-1` into the table, and every composition of `-1` with anything stays `-1`, so an overshoot detected at any level propagates to the answer without a separate bounds check.

The Python and Java solutions implement exactly this, differing only in that Java allocates a rectangular `int[levels][n]` while Python builds a list of rows. Both handle the degenerate shapes the tests exercise — a single node, a pure chain, a star, and shallow wide trees where almost every query resolves in one or two jumps.

**Complexity:** `O(n log n)` time and space to construct, `O(log n)` time per `getKthAncestor` call.
