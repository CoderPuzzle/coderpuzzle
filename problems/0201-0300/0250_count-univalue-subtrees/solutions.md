# Solutions — Count Univalue Subtrees

## Post-order depth-first search

Whether the subtree hanging from a node is uni-value is decided entirely below it: it holds exactly when both children's subtrees are themselves uni-value and every child that exists carries the node's value. Nothing a parent can do repairs a broken child, so the verdict only ever flows upward — which makes post-order traversal the shape of the problem itself. The code recurses into both children first, then judges the node from the two returned booleans and the children's values.

Each call answers one question — is the subtree rooted here uni-value — and every `true` handed upward is one more subtree for the count, incremented on the spot. The recursion bottoms out on two base cases: a leaf, whose one-node subtree is uni-value by definition, and the empty tree, which is reported as vacuously uni-value because an absent child can never break its parent — only a present child with the wrong value can. That vacuous case is never counted, so an empty root returns 0 without any special handling.

The one trap is short-circuiting: both children must be visited even when the first already breaks this node, because the counting happens inside the recursion and a skipped branch would silently skip its own uni-value subtrees. Both child results are evaluated into locals first, so every node is visited exactly once no matter how mixed the tree is — `[5,1,5,5,5,null,5]` still counts the three 5-leaves plus the 5-parent on the left even though the root's verdict fails.

**Complexity:** `O(n)` time — each node is visited exactly once — and `O(h)` space for the call stack, where `h` is the tree's height: `O(log n)` for a balanced tree, `O(n)` worst case for a skewed chain (at most 1000 nodes).
