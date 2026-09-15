# Solutions — Choose Edges to Maximize Score in a Tree

## Post-order tree dynamic programming

This is a maximum-weight independent set on a tree, solved with two DP states per node. Let `dp0[u]` be the best total weight inside `u`'s subtree when the edge from `u` to its parent is not chosen, and `dp1[u]` the best when that edge is chosen. The weight of the parent edge is accounted by the parent, so `dp1` only constrains `u`'s own choices: with its parent edge taken, `u` may not take any edge to a child, hence `dp1[u]` is simply the sum of `dp0[c]` over all children `c`. The answer for the root is `dp0[0]`.

If the parent edge is not chosen, `u` may take at most one child edge. Starting from `base = sum(dp0[c])` (take no child edge), switching child `c` from unselected to selected changes the total by `dp1[c] + w - dp0[c]`, where `w` is the weight of the edge to `c`. So `dp0[u] = base + max(0, best gain)`. Because the gain is only applied when positive, negative-weight edges are never forced in: a losing child edge is simply skipped, which is why weights as low as `-10^6` need no special handling, and choosing no edges at all (answer 0) is always available.

The implementation avoids recursion, since `n` can be `10^5` and a deep chain would overflow Python's stack. Children lists are built from the parent array, a stack produces a preorder listing of the nodes, and iterating that listing in reverse guarantees every child is finalized before its parent. A single node (`n == 1`) has no edges and returns 0 immediately.

**Complexity:** `O(n)` time, `O(n)` space.
