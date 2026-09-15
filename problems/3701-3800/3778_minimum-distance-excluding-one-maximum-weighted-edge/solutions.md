# Solutions — Minimum Distance Excluding One Maximum Weighted Edge

Every candidate route pays all its edges except one, so the free edge may as
well be chosen freely during the search — for a fixed path, excluding the
first maximum-weight edge and excluding any single designated edge both leave
`sum − maxweight`.

## Dijkstra over (node, excluded) states

Run Dijkstra on a graph of `2n` states: `(node, 0)` has not yet spent its
exclusion, `(node, 1)` has. Staying within a layer pays the edge weight;
crossing from layer 0 to layer 1 traverses exactly one edge for free, which
is the exclusion. The first pop of `(n - 1, 1)` is the answer: edge weights
are positive, so Dijkstra's first settle is final, and the connected graph
guarantees every node is reachable in both layers (layer 1 is entered from
layer 0 through any edge).

Distances are sums of at most `n − 1` weights of `5 · 10⁴` each, so they
reach `≈ 2.5 · 10⁹` — past 32-bit range, hence 64-bit accumulators
(still far below `2⁵³`, so JavaScript numbers stay exact). Runtime is the
usual `O(m log n)` heap Dijkstra over twice the nodes, with `O(n + m)` space.

**Complexity:** `O(m log n)` time, `O(n + m)` space.
