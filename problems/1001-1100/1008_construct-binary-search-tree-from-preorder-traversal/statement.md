# Construct Binary Search Tree from Preorder Traversal

## Description

Given an array of integers `preorder`, which represents the preorder
traversal of a BST (i.e. binary search tree), construct the tree and return
its root.

It is guaranteed that there is always possible to find a binary search tree
with the given requirements for the given test cases.

A binary search tree is a binary tree where for every node, any descendant of
`Node.left` has a value strictly less than `Node.val`, and any descendant of
`Node.right` has a value strictly greater than `Node.val`.

A preorder traversal of a binary tree displays the value of the node first,
then traverses `Node.left`, then traverses `Node.right`.

### Example 1

```text
Input: preorder = [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]
```

![The six-node BST with root 8, left subtree 5 - 1 - 7, and right subtree 10 - 12.](figures/example-1.svg)

### Example 2

```text
Input: preorder = [1,3]
Output: [1,null,3]
```

### Constraints

- `1 <= preorder.length <= 100`
- `1 <= preorder[i] <= 1000`
- All the values of `preorder` are unique.

## Hints

### Hint 1

The first value of the preorder array is always the root of the (sub)tree.

### Hint 2

Recursion with (low, high) bounds: take the next value only if it fits in the current node's allowed range, otherwise the subtree is finished and the value belongs to an ancestor's right side.

### Hint 3

Equivalently, a monotonic stack of nodes with increasing values lets you attach each new node as a left child or as the right child of the last smaller ancestor.
