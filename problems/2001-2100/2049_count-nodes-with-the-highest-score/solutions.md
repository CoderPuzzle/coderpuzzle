# Solutions — Count Nodes With the Highest Score

## Iterative postorder subtree sizes

Build each node's children list, then traverse iteratively from root `0` to
place every parent before its descendants in an `order` array. Reading that
array backwards is a postorder: every child size is available before its
parent. For a node, multiply the nonempty child subtree sizes and also multiply
the remaining component `n - subtree[node]` when it is nonzero. Comparing this
product with the best seen so far updates either the maximum and resets its
count or increments the count on a tie.

The traversal is deliberately iterative because a valid tree may be a chain of
`10⁵` nodes, deeper than ordinary call stacks allow. Products use 64-bit
integers in fixed-width languages: removing a binary-tree node creates at most
three components, but their size product can still exceed 32-bit range.

**Complexity:** `O(n)` time and `O(n)` space.
