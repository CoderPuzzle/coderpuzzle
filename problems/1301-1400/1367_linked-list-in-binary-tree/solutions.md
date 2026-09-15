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

No recursion is used: the traversal stacks keep the solution safe under the
runners' small thread stacks.

**Complexity:** `O(T * min(D, L))` time for `T` tree nodes, tree height `D`
and list length `L`, plus `O(L)` extra space beyond the traversal stack.
