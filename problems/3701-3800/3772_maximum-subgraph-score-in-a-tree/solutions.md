# Solutions — Maximum Subgraph Score in a Tree

## Rerooting DP on the Tree

Give every node a weight of +1 when good and −1 when bad, so a connected subgraph's score is just its weight sum, and the question becomes: for each node i, the maximum-weight connected subgraph containing i. The first sweep computes down[u], the best such subgraph confined to u's subtree — it is weight[u] plus each child's down value counted only when positive, the classic pruning that lets an optimal connected region drop harmful branches.

The second sweep reroots: up[u] is the best score of a connected piece hanging off u through its parent side, excluding u's own subtree, and it is initialized to a large negative sentinel for the root so the root's parent side can never contribute. Walking the tree in BFS order, each node u knows total_pos, the sum of the positive parts of its children's down values; then for each child c, up[c] = weight[u] + (total_pos minus c's own positive part) + max(0, up[u]) — that is, the parent plus u's other worthwhile branches plus whatever the rest of the tree offered u. The answer for u itself is weight[u] + total_pos + max(0, up[u]).

Subtracting max(0, down[c]) when computing up[c] is the detail that keeps the two sweeps disjoint — the parent-side piece must not reuse the child's subtree it will soon be rerooted into. Both sweeps run over an explicit-stack traversal, so 10^5-deep trees are safe, and every node's value falls out in O(deg) work.

**Complexity:** `O(n)` time, `O(n)` space.
