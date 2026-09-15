# Solutions — Total Sum of Interaction Cost in Tree Groups

## Edge contribution over subtree label counts

A pair's interaction cost is the number of edges on its path, so the sum over
pairs can be re-read as a sum over edges: each edge collects one unit from
exactly the same-group pairs it separates. Deleting the edge between node
`c` and its parent splits the tree into `c`'s subtree and everything else;
if `a` nodes of label `g` lie inside, then `total[g] - a` lie outside, and
exactly `a * (total[g] - a)` same-group pairs cross the split, each paying
one unit on this edge. Summing that product over the twenty labels and all
`n - 1` edges yields the answer without ever enumerating a pair.

Getting every subtree's label counts is one bottom-up sweep. A breadth-first
pass from node 0 records a discovery order and each node's parent; walking
that order in reverse guarantees a node is folded into its parent only after
all of its own descendants have folded into it, so each node's vector of 21
counters (labels are 1..20) is complete the moment it is read. The traversal
is an explicit queue rather than recursion — the constraints allow a 10⁵-node
path, deep enough to overflow the default stacks of every fixed-width
runtime.

The accumulators are 64-bit integers in the fixed-width languages: a
single-label path of 10⁵ nodes sums to 10⁵ * (10¹⁰ - 1) / 6 ≈ 1.7 × 10¹⁴,
far past 32-bit range. JavaScript and TypeScript numbers stay exact with no
BigInt machinery, because every intermediate — a count (≤ 10⁵), a per-edge
product (≤ 2.5 × 10⁹), and the running total — sits safely below
2⁵³ ≈ 9 × 10¹⁵.

**Complexity:** `O(n * G)` time and `O(n * G)` space, with `G <= 20` labels.
