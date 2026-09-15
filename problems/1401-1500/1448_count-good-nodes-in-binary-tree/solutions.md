# Solutions — Count Good Nodes in Binary Tree

## DFS Tracking the Path Maximum

A node is good exactly when its value is at least the largest value appearing on the path from the root down to it; in particular the root is always good. That definition points directly at a traversal that carries one extra piece of state: the maximum value along the current root path.

![The example tree with its four good nodes shaded; each equals the maximum on its root path.](figures/solution-good-nodes.svg)

The solution uses an explicit stack of (node, max so far) pairs, seeded with the root and its own value. Popping a node, it compares the node's value against the carried maximum: if the value is at least the maximum, the node is counted as good and the carried maximum is raised to the value. Both children, when present, are pushed with this possibly-updated maximum, and the running count accumulates over the whole traversal.

The exploration order is irrelevant — stack-based DFS visits each node exactly once — and each child's entry is created only after its parent's maximum is final, so every node is compared against the true maximum of its root path. Equal values count as good, which the non-strict comparison handles, and nodes may repeat values freely since only the running maximum, not distinctness, matters. With up to 10^5 nodes the traversal is linear, and the stack never holds more entries than there are nodes.

**Complexity:** `O(n)` time, `O(n)` space.
