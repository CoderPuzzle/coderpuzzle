# Binary Tree Paths

## Description

Given the `root` of a binary tree, return all root-to-leaf paths. Each path
renders the values along it joined by `->`.

For a deterministic answer, return the paths in the order a depth-first walk
meets the leaves, visiting the left subtree before the right at every node.

A leaf is a node with no children.

### Example 1

![diagram](figures/257-1.svg)

```text
Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
```

### Example 2

```text
Input: root = [1]
Output: ["1"]
```

### Constraints

- The number of nodes in the tree is in the range `[1, 100]`.
- `-100 <= Node.val <= 100`
