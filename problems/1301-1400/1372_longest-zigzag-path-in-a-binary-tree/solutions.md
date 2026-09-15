# Solutions — Longest ZigZag Path in a Binary Tree

## Approach: Iterative post-order with per-node directional depths

Every zigzag path is determined by, for each node, two numbers: how far a
zigzag continues if the path arrives at this node moving right (and must next
go left), and how far if it arrives moving left. An iterative post-order
traversal with an explicit stack computes both bottom-up: for node `v`, let
`left_run` be one plus the right-arrival run of `v.left` (moving left from
`v` into its left child flips direction there) and `right_run` one plus the
left-arrival run of `v.right`; missing children contribute 0. Each visit also
folds both runs into a running maximum, because a path may start at any node.
The answer is that maximum — 0 for a single node.

The explicit stack keeps the traversal within the runners' small thread
stacks for trees up to 5 * 10^4 nodes.

**Complexity:** `O(N)` time over `N` nodes, `O(N)` space for the stack and
per-node runs.
