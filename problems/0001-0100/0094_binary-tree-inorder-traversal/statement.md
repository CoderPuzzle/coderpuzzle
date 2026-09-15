# Binary Tree Inorder Traversal

## Description

Given the `root` of a binary tree, return the inorder traversal of its nodes' values.

### Example 1

```text
Input: root = [1,null,2,3]
Output: [1,3,2]
```

![diagram](figures/94-1.svg)

### Example 2

```text
Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
Output: [4,2,6,5,7,1,3,9,8]
```

![diagram](figures/94-2.svg)

### Example 3

```text
Input: root = []
Output: []
```

### Example 4

```text
Input: root = [1]
Output: [1]
```

### Constraints

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

### Follow-up

Recursive solution is trivial, could you do it iteratively?
