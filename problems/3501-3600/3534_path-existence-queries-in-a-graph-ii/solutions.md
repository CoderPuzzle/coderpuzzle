# Solutions — Path Existence Queries in a Graph II

## Component Jumps and Binary Lifting

Sort the node ids by value and work in that order. Two structural facts
make the queries cheap. First, components are contiguous segments: a node's
neighbors are exactly the sorted positions whose values lie within maxDiff,
a contiguous range around it, so components are cut at consecutive value
gaps greater than maxDiff. Second, distances reduce to farthest-reach
composition: from a sorted position i one hop lands on any position up to
`reach[i]`, the rightmost position within maxDiff, and since that reachable
range is contiguous, the greedy strategy of always jumping as far right as
possible achieves the minimum number of hops to any later position in the
same component.

One sort plus two linear passes (a two-pointer scan for every `reach[i]`,
and a running counter for component labels) set up the data. A sparse
binary-lifting table then stores `up[k][i]`, the farthest position
reachable from i in at most 2^k hops, each level composed from the previous
one in O(n). A query `[ui, vi]` maps through the sort ranks; different
components answer -1, equal positions answer 0, and otherwise the lifting
table descends from its highest level, accumulating every jump that stays
short of the target — the standard descent yields the exact hop count in
O(log n), plus one final hop into the target.

Total cost is dominated by the sort and the O(n log n) lifting table; each
of the m queries costs O(log n). Answers are hop counts below n and -1
sentinels, comfortably inside 32-bit integers.

**Complexity:** `O(n log n + m log n)` time, `O(n log n)` space.
