# Lowest Common Ancestor of a Binary Search Tree

## Description

Given a binary search tree (BST), find the lowest common ancestor (LCA) node
of two given nodes in the BST.

According to the definition of LCA on Wikipedia: "The lowest common ancestor
is defined between two nodes p and q as the lowest node in T that has both p
and q as descendants (where we allow a node to be a descendant of itself)."

In this judge, `p` and `q` are given as node values, and you should return the
value of the lowest common ancestor node.

### Example 1

```text
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
```

![The BST with p = 2, q = 8 and their LCA 6 highlighted.](figures/example-1.svg)

### Example 2

```text
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant
of itself according to the LCA definition.
```

![The BST with p = 2, q = 4 and their LCA 2 highlighted.](figures/example-2.svg)

### Example 3

```text
Input: root = [2,1], p = 2, q = 1
Output: 2
```

### Constraints

- The number of nodes in the tree is in the range `[2, 10^5]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are unique.
- `p != q`
- `p` and `q` will exist in the BST.

## Hints

### Hint 1

A BST is ordered: every value in a node's left subtree is smaller than it, and every value in its right subtree is larger.

### Hint 2

If both p and q are smaller than the current node, walk left; if both are larger, walk right.

### Hint 3

The first node where p and q no longer lie on the same side (or where the node equals p or q) is the lowest common ancestor.
