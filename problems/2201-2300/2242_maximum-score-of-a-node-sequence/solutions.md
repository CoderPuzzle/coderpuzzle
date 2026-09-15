# Solutions — Maximum Score of a Node Sequence

## Enumerate the middle edge with top-3 neighbours

A valid 4-node sequence `x, a, b, y` is held together by three edges, and the middle one `(a, b)` is the natural thing to enumerate: every edge in the input is tried as `(a, b)`, and then the problem reduces to picking a neighbour `x` of `a` and a neighbour `y` of `b` that maximize `scores[x] + scores[y]` subject to all four nodes being distinct. Brute-forcing all neighbour pairs would be quadratic in degree, but only the _highest-scoring_ neighbours can ever matter.

The decisive bound is that keeping just the top **3** highest-scoring neighbours per node is enough. When choosing `x` from `a`'s side, at most two candidates are forbidden — `b` itself, and whichever node `y` turns out to be — so among the top 3 by score at least one is always legal; symmetrically for `y`. The code precomputes `top3[v]` by sorting each adjacency list by descending score and slicing the first three, then for every edge `(a, b)` tries the at-most `3 × 3` combinations, skipping any with `x == b`, `y == a`, or `x == y`, and folds in `scores[a] + scores[b]` as the fixed base.

If no edge admits a single legal combination — say the graph is a star or too sparse — `best` stays at its initial `-1`, matching the required sentinel. Building `top3` sorts each adjacency list, costing `O(E log E)` over all nodes combined, while the enumeration itself is a constant 9 probes per edge; adjacency storage dominates the memory alongside the `top3` lists.

**Complexity:** `O(E log E)` time, `O(n + E)` space.
