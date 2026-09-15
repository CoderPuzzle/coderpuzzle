# Solutions — Construct Binary Search Tree from Preorder Traversal

## Bounded recursion over the preorder stream

A single index cursor walks the preorder array exactly once. `build(low, high)` claims the next value only if it lies within the open bound pair — initially `(-inf, +inf)`; if `preorder[index]` falls outside `[low, high]`, it belongs to some ancestor's right subtree, so the call returns `None` without consuming anything. This "peek, don't take" rule is what replaces explicit searches for subtree boundaries.

When the value fits, it is consumed and becomes the node: the left subtree is built with tightened bounds `(low, value - 1)` and the right with `(value + 1, high)`. Preorder emits the root, then the entire left subtree, then the entire right subtree, so the recursion's claim order matches the array order exactly — every value is consumed exactly once and lands in the unique position the BST property dictates for it. Exhausting the array (`index == len(preorder)`) terminates every pending branch.

![The BST built from [8, 5, 1, 7, 10, 12], each node annotated with the bounds that admitted it.](figures/solution-bst-bounds.svg)

Because the input is guaranteed to be a valid BST preorder, no value is ever stranded by repeated bound rejections, and each of the at most `2n + 1` calls does constant work. A chain-shaped tree (strictly increasing or decreasing values) is the worst case for recursion depth, while a balanced tree needs only logarithmic stack.

**Complexity:** `O(n)` time, `O(n)` space in the worst case for the recursion stack (`O(h)` for balanced trees).
