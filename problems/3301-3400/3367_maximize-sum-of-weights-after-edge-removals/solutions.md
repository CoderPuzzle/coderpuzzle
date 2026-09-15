# Solutions — Maximize Sum of Weights after Edge Removals

## Rooted Tree DP with Keep/Drop Choices per Child Edge

Root the tree at node 0 and think about each node's budget of `k` incident edges as a resource shared between its parent edge and its children. For every node `u` the DP computes two values over its subtree: `g[u]`, the best retained weight when the edge to `u`'s parent is dropped, and `f[u]`, the best when that parent edge is kept — the kept case reserves one of the `k` slots, so it can keep at most `k - 1` children.

For each child `v` reached via edge weight `w`, dropping the child edge contributes `g[v]`; keeping it contributes `w + f[v]`. The surplus of keeping is the gain `w + f[v] - g[v]`, so `u`'s optimum starts from the sum of all `g[v]` and then takes the largest positive gains, sorted descending — up to `k` of them for `g[u]`, up to `k - 1` for `f[u]`. Negative gains are never taken, which also correctly handles cases where dropping every child edge is best.

Greedy selection of the top gains is optimal because the budget constraint couples the children only through their count: each child contributes independently, so taking the largest gains first dominates any other choice. The answer is `g[0]`, since the root has no parent edge and enjoys the full `k` budget.

Implementation detail worth noting: the traversal is iterative — an explicit stack builds a preorder list, and the DP is evaluated in reverse order, so children are finalized before their parent and no recursion depth limits are hit on trees with `10⁵` nodes. Sorting each node's gains costs `O(d log d)` for degree `d`, summing to `O(n log n)` over the tree.

**Complexity:** `O(n log n)` time, `O(n)` space.
