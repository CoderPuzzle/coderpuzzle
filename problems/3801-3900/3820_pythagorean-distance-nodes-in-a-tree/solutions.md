# Solutions — Pythagorean Distance Nodes in a Tree

## Three breadth-first searches

A tree offers exactly one path between any two nodes, and every edge has unit
weight, so the distance from any node to a fixed target is simply the depth
at which a breadth-first search started at that target discovers the node —
the frontier moves outward in strictly increasing distance order. Running
that search once from `x`, once from `y`, and once from `z` fills three
distance arrays that jointly cover every node, which is all the per-node
information the definition of special needs. Each search is driven by an
explicit frontier queue rather than recursion, because the constraints admit
a 10⁵-node path, deep enough to overflow the default call stack of a
recursive traversal in every fixed-width runtime.

The classification itself is one linear scan: for each node `u`, sort its
three distances into `a <= b <= c` and count the node when `a² + b² = c²`.
Sorting three values is a constant number of comparisons, and the equality
is strict — a node sitting on a target (distance 0) counts exactly when the
other two distances are equal, since `0 + b² = c²` collapses to `b == c`.

Distances are bounded by `n - 1 <= 10⁵ - 1`, so their squares reach about
`10¹⁰` and the sum of the two smaller squares about `2 × 10¹⁰` — past 32-bit
range, hence the 64-bit comparison in C++, Java, Go, and Rust. The returned
count is at most `n`, safely narrow. JavaScript and TypeScript numbers stay
exact with no BigInt machinery, because every intermediate sits far below
`2⁵³ ≈ 9 × 10¹⁵`.

**Complexity:** `O(n)` time and `O(n)` space.
