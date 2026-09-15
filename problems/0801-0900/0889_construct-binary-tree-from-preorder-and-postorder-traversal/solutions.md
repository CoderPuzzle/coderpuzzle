# Solutions — Construct Binary Tree from Preorder and Postorder Traversal

## Divide and conquer on a postorder index map

Preorder opens a subtree with its root and postorder closes the same subtree
with it, so the root of whatever segment is being built sits at the front of
its preorder range. When the segment holds more than the root, the value
right behind it roots the subtree that follows — and postorder says where
that subtree ends: postorder lists left subtree, then right subtree, then
root, so the run from the segment's postorder start up to that value's
position is exactly the first subtree, and its size falls out as one past
the position. A hash from value to postorder index makes that measurement an
`O(1)` lookup; the values are unique, so a hit names one position with no
ambiguity.

The measured size splits the remaining preorder range into a left part and
a right part, and the same argument rebuilds each. The split also settles
the statement's determinism rule with no extra branch at all: when a node
has two children the two traversals force their exact spans, and when it has
one, the first range swallows the entire remainder and the right range comes
back empty — so an only child always ends up attached on the left, precisely
the required answer. Recursion over half-open ranges `[low, high)` with the
segment's postorder start carried alongside is safe here: the constraint
ceiling is 30 nodes, so even a pure chain nests at most 30 calls, well
inside every judge runtime's stack.

**Complexity:** `O(n)` time — one map build, one node, and one `O(1)` size
measurement per tree node — and `O(n)` space for the index map and the tree
itself.
