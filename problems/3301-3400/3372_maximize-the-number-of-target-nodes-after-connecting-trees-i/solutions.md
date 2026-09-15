# Solutions — Maximize the Number of Target Nodes After Connecting Trees I

## Per-node bounded BFS over both trees

Connecting node `i` of tree 1 to node `v` of tree 2 creates paths that cross
exactly one added edge, so a second-tree node `w` is target to `i` through
`v` only when `dist1(i, u) + 1 + dist2(v, w) <= k` for the chosen endpoint
`u` of the added edge. Maximizing per query splits cleanly: tree 1
contributes the nodes within `k` of `i` (that part never improves by picking
a different `u`), and tree 2 contributes its best radius-`k-1` neighborhood
over every choice of `v` — the same maximum for every `i`, computed once.
That is exactly hints 1 and 2, and the two parts add to `answer[i]`.

Each count comes from a breadth-first layer walk that stops after `k` (or
`k - 1`) layers, visiting at most all `n` (respectively `m`) nodes per
start. At the constraint ceiling `n, m <= 1000` that is a couple of million
edge inspections in total, so the double loop over start nodes stays well
inside the time limit in every language. The walks are iterative frontier
loops — a 1000-node path would overflow any recursion-based traversal under
the judged stack limits — and the `k = 0` floor falls out of the same code:
a negative radius contributes zero second-tree nodes, leaving each answer
at its self-count of 1.

**Complexity:** `O(n² + m²)` time (a bounded BFS per node, `n, m <= 1000`),
`O(n + m)` space for the adjacency lists beyond the output.
