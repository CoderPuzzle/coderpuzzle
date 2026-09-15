# Construct Binary Tree from Preorder and Inorder Traversal

## Description

Given two integer arrays `preorder` and `inorder` where `preorder` is the
preorder traversal of a binary tree and `inorder` is the inorder traversal of
the same tree, construct and return the binary tree.

### Example 1

```text
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

![The reconstructed tree, with the root 3 and its positions in preorder and inorder highlighted.](figures/example-1.svg)

### Example 2

```text
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

### Constraints

- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder` and `inorder` consist of unique values.
- Each value of `inorder` also appears in `preorder`.
- `preorder` is guaranteed to be the preorder traversal of the tree.
- `inorder` is guaranteed to be the inorder traversal of the tree.

## Hints

### Hint 1

The first element of preorder is the root; find it in inorder to split the traversal into left and right subtrees.

### Hint 2

Build a hash map from value to inorder index so each split is O(1) instead of a linear scan.

### Hint 3

Recurse with (low, high) bounds on inorder and consume preorder elements through a single shared cursor.
