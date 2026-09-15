# Solutions — Balanced Binary Tree

## Bottom-up height check with a -1 sentinel

The definition asks about the heights of every node's two subtrees, so the unit of work is a subtree height. Computing each height bottom up — a node's height becomes known exactly when both of its children's heights are — lets every node be visited once, unlike the top-down scheme that recomputes `height(child)` at every node and degrades to `O(n²)` on a skewed tree. At the moment a node's children are both settled, the balance test for that one node is `|height(left) - height(right)| <= 1`, checked with the children's already-known values.

The sentinel `-1` folds "unbalanced somewhere below" into the height domain itself: a node whose subtree contains an imbalance stores `-1` instead of a height, and any parent reading `-1` from either child stores `-1` in turn — a subtree that contains an imbalance makes every ancestor unbalanced by definition, so the failure propagates upward for free and the whole question reduces to `height(root) != -1`. An absent child contributes height 0, the empty tree is balanced before the walk begins, and a leaf stores 1.

The walk is deliberately an explicit stack rather than the classic recursive height function. The tree may hold up to 5000 nodes, and a skewed chain makes the recursion depth grow with the node count — around 5000 nested calls, past Python's default recursion limit of 1000 and uncomfortably deep for several other runtimes. The peek-settle discipline (peek the top node; if its children are not yet settled, push the unsettled ones, otherwise pop it and record its height) reproduces post-order exactly while touching no call stack, and costs the same order of memory the recursion would.

**Complexity:** `O(n)` time — each node is pushed and settled exactly once — and `O(n)` space for the heights map, with the stack itself never holding more than a root-to-leaf path's worth of pending nodes.
