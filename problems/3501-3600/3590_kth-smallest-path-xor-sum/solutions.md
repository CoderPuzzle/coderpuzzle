# Solutions — Kth Smallest Path XOR Sum

## Small-to-large merging of sorted distinct XOR lists

The path XOR of every node is fixed by the prefix rule
`path[u] = vals[u] XOR path[par[u]]`, so a preorder pass (explicit stack —
the tree can be a 5 * 10⁴-node chain, which no recursive DFS survives)
computes them all. A subtree's distinct path XORs form exactly the union of
the node's own value with its children's subtree sets, and that union only
grows with inclusion, so the lists are built bottom-up over the preorder
reversed: every child finishes before its parent, and each merge folds a
smaller sorted distinct list into a larger one, which bounds each element
to O(log n) moves across its ancestors — the small-to-large discipline from
the hints, with plain sorted lists playing the role of the ordered set.

The merge itself picks the cheaper of two representations: a small child
(up to 64 values) splices its values into the base list one by one —
binary search for the position, then a single contiguous insert — while a
large child is folded in with one two-pointer pass that dedupes as it goes,
and the largest child's list is reused as the base so a chain never
re-copies its spine. Queries are grouped by node while reading the input;
when a node's list is final, each of its queries `k` indexes
`list[k - 1]`, or answers `-1` when `k` passes the distinct count. All
values are below 2¹⁷ (`vals[i] <= 10⁵`) and every answer is at most `n`, so
32-bit integers and JS-exact numbers hold everywhere.

**Complexity:** `O(n log² n)` time for the merges plus `O(q)` to answer,
`O(n log n)` space for the per-node distinct lists.
