# Solutions — Linked List in Binary Tree

## Approach: Iterative match-from-every-node

Flatten the linked list into an array once. Then do one iterative
depth-first traversal of the tree with an explicit stack; for every tree node
whose value equals the first list element, walk downward from it — again with
an explicit (node, index) stack — consuming successive list entries while they
match the child values. The whole list matches when the index reaches the end;
a mismatch simply abandons that starting point. Trying every node as a
potential start is `O(nodes * depth)` worst case, comfortably within limits at
2500 nodes and 100 list items.

![Example 1's head = [4,2,8] tried from both 4-valued tree nodes: the stack from the left 4 walks (B,0), (D,1), then dies at (F,2) where 1 ≠ 8, while the stack from the right 4 walks (C,0), (E,1), pushes (G,2) and (H,2), and the pop of (H,2) matches 8 at index 2, so the index reaches the list end and the answer is true.](figures/solution-match-from-every-node.svg)

No recursion is used: the traversal stacks keep the solution safe under the
runners' small thread stacks.

**Complexity:** `O(T * min(D, L))` time for `T` tree nodes, tree height `D`
and list length `L`, plus `O(L)` extra space beyond the traversal stack.
