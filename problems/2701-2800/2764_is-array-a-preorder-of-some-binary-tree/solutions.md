# Solutions — Is Array a Preorder of Some Binary Tree

## Ancestor stack, one pass

Walk the array once, keeping a stack of the ids whose subtrees are still
open. A node may only be visited while its parent is open, so before pushing
each `[id, parentId]` we pop until `parentId` surfaces on top — every popped
id is a subtree the walk has just completed. If the stack empties before the
parent turns up, that subtree already closed and the node can no longer be
reached, so the order is not a preorder. The first entry must carry
`parentId == -1`; it is the only node that may start with nothing on the
stack.

The invariant also makes acceptance sufficient. While the walk sits anywhere
inside a subtree, exactly its unfinished ancestors are stacked, so a parent
that survives the popping is one that could still receive a child. Because
the input is a binary tree, such a parent has at most one earlier child, and
placing each arriving node into that free slot rebuilds, on the fly, a tree
whose preorder is precisely the given array. Parents automatically precede
children as well — a parent can only be found on a stack it was pushed onto.

Every id is pushed once and popped at most once, so the pass stays linear no
matter how lopsided or deep the tree is; an explicit list stands in for
recursion, which matters at the `10⁵` depth the constraints allow.

**Complexity:** `O(n)` time, `O(n)` space.
