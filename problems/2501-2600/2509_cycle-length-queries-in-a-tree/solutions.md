# Solutions — Cycle Length Queries in a Tree

Adding the edge closes exactly one cycle: the unique tree path between
`ai` and `bi`, closed by the edge itself. Everything therefore reduces to
reporting that path's length for every query — no graph traversal on the
augmented graph is ever needed, because deleting the added edge restores
the same tree before the next query.

## Parent-halving walk to the common ancestor

The tree lives implicitly in the numbering: node `v` has parent `v / 2`
(integer division), so an ancestor of `v` is just `v` shifted right some
number of times. Keep two pointers starting at `ai` and `bi`; whenever
they differ, replace the larger by its parent and count one step. The
first time they are equal both walks stand on their lowest common
ancestor, and the counter equals `depth(ai) + depth(bi) -
2·depth(LCA)` — the distance. The cycle length is that distance plus the
added edge, so every query is answered with one climb taking at most 30
parent steps given `n <= 30`.

All values fit in 32 bits (`2ⁿ - 1 <= 2³⁰ - 1`), halving never overflows,
and per-query work is logarithmic while only the output array itself is
stored.

**Complexity:** `O(m log n)` time, `O(m)` space for the output.
