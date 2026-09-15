# Solutions — Maximum Depth of N-ary Tree

## Level counting

The depth is measured one level at a time: the walk holds the current level
as a list starting from the root's singleton, counts one for it, and
replaces it with the concatenation of every node's children. The loop ends
when a level contributes nothing — that count is the number of nodes on the
longest root-to-leaf path, with the empty tree counting zero levels and a
leaf root exactly one.

Only the frontier is kept beside a counter, and sibling order within a
level is irrelevant to the count. The traversal is iterative, so a
1000-deep chain costs queue slots rather than stack frames.

**Complexity:** O(n) time, O(n) space, where n is the number of nodes.
