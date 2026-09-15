# Solutions — Convert Binary Search Tree to Sorted Doubly Linked List

## Iterative in-order threading

The ring's order is exactly the tree's in-order — the BST property makes
the sorted sequence the traversal order. An explicit-stack in-order walk
(visiting is safe from recursion limits on a 2000-node chain: push the
left spine, pop, visit, slide right) collects the values smallest first,
without touching the input tree's own left/right links.

The collected values then become the ring: consecutive nodes link
`prev.right = next` and `next.left = prev`, and the final close-up wires
the smallest's `left` to the largest and the largest's `right` back to the
smallest — head and tail are one link apart, as a circular list demands.
The returned head is the first-collected node, the tree's minimum; an
empty tree has no ring and returns `null` (`[]` on the wire).

Each node is pushed and popped exactly once and each ring node created
once; the stack is at most the tree's height.

**Complexity:** O(n) time, O(n) space.
