# Solutions — Sum of Distances in Tree

## Rerooting with subtree sizes

Computing each node's distance sum by its own traversal would cost `O(n^2)`; instead the tree is rooted once at node 0 and every other answer is derived from its parent's answer in constant time. An iterative BFS first records each node's parent and a preorder list, avoiding recursion limits on deep trees.

The bottom-up pass walks the preorder in reverse so children are finished before their parents. It computes two things per node: `sub[u]`, the size of the subtree rooted at `u`, and `dist[u]`, the sum of distances from `u` to all nodes inside its subtree. The recurrence follows a single edge: each child `v` contributes `dist[v] + sub[v]` to `dist[u]`, because every node below `v` is one edge farther from `u` than from `v`. After this pass, `dist[0]` is the root's answer.

The top-down pass then pushes answers down the preorder. Moving the root across the edge `u -> v` changes exactly the nodes on that edge's two sides: the `sub[v]` nodes inside `v`'s subtree each get one step closer, and the remaining `n - sub[v]` nodes each get one step farther, giving `ans[v] = ans[u] + (n - sub[v]) - sub[v]`. Since parents are processed before children in preorder, every answer is available when it is needed, and all `n` answers are produced after two linear sweeps.

![The example tree with each node's subtree size and answer; rerooting across 0 → 2 shifts two nodes closer and four farther.](figures/solution-reroot.svg)

**Complexity:** `O(n)` time, `O(n)` space.
