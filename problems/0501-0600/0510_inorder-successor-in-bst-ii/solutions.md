# Solutions — Inorder Successor in BST II

## Parent-walk successor

With the query node in hand (the wire names it by value, so a short
stack walk finds the matching node — values are unique), the successor
splits into two shapes. If the node has a right subtree, every value in
it is greater, and the successor is that subtree's leftmost node — one
left-only descent. If it has none, the successor is an ancestor: climb
`parent` links while coming up from a right child (every such ancestor is
smaller — its subtree finished), and stop at the first ancestor reached
from a left child — the smallest ancestor still greater than the node.
Climbing past the root means the node is the maximum and there is no
successor (`[]` on the wire).

The climb itself never reads a value — comparisons are pointer identity
against `parent.left`, exactly the follow-up's challenge. Only the
find-by-value preamble touches `val`, and it exists purely because this
bank's wire names the node by value instead of passing the node object.

The two walks touch one root-to-node chain and at most one left spine
below the node.

**Complexity:** O(n) worst case (value lookup on a degenerate tree;
O(h) once the node is in hand), O(1) extra space.
