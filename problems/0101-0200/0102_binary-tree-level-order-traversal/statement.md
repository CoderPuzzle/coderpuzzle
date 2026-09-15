# Binary Tree Level Order Traversal

## Description

Given the `root` of a binary tree, return the level order traversal of its
nodes' values. (i.e., from left to right, level by level).

### Example 1

```text
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Explanation: The tree is
    3
   / \
  9  20
    /  \
   15   7
```

![The tree with one tinted band per level and the level-order output on the right.](figures/example-1.svg)

### Example 2

```text
Input: root = [1]
Output: [[1]]
```

### Example 3

```text
Input: root = []
Output: []
```

### Constraints

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

## Hints

### Hint 1

Use a queue to process the tree breadth-first, one level at a time.

### Hint 2

The number of nodes in the queue at the start of a round is exactly one level; drain exactly that many nodes before moving on.

### Hint 3

While draining a level, push each node's non-null children so the next round covers the next level.
