# Solutions — Diameter of Binary Tree

## Post-Order DFS with Height Tracking

Any path through a node descends into its left subtree and its right subtree, so the longest path anchored at that node has length `left height + right height`, measured in edges. The solution therefore performs one post-order traversal computing each node's height in edges (a leaf is 0, a null child contributes nothing, otherwise `1 + max(left, right)`) and, on the way back up, records the largest `left + right` sum it sees in `diameter`.

Tracking the best anchor inside the recursion is what lets a single pass answer the question: the diameter is the maximum over _all_ nodes, and the best path may pass through some deep node while bypassing the root entirely, so combining only the root's two heights would be wrong. Each node is visited exactly once and contributes one candidate, so the traversal is linear in the number of nodes.

The recursion's return value and the recorded candidate are deliberately different quantities — height (one-sided, for the parent's candidate) versus diameter (two-sided, the final answer) — which is the standard pitfall this formulation avoids. Null children return 0, making a single-node tree yield diameter 0, and a two-node tree 1, matching the examples. Beyond the `nonlocal` counter, memory is only the recursion stack, whose depth is the tree's height `h`.

**Complexity:** `O(n)` time, `O(h)` space.
