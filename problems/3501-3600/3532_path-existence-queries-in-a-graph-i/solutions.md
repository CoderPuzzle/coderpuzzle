# Solutions — Path Existence Queries in a Graph I

## Component Labels from Consecutive Gaps

Because `nums` is sorted, the edges have a segment property: whenever nodes
i and j (i < j) are adjacent — |nums[i] - nums[j]| <= maxDiff — every
consecutive pair k, k+1 between them is adjacent too, since its gap is at
most the i→j gap. Any path can therefore be rewritten as a walk over
consecutive indices, and the connected components are exactly the maximal
runs of indices where each consecutive gap is at most maxDiff: contiguous
segments of the sorted order, cut at every "too big" gap.

So one linear pass labels the components: `comp[0] = 0` and each later
index either inherits the previous label or starts a new one, depending on
whether its gap exceeds maxDiff. Each query `[ui, vi]` then collapses to a
single equality check `comp[ui] == comp[vi]`, with u = v trivially true
because a node shares its own label.

The whole algorithm is one scan plus one constant-time comparison per
query; the component labels stay below n, so 32-bit integers suffice
throughout.

**Complexity:** `O(n + m)` time, `O(n)` space (m = number of queries).
