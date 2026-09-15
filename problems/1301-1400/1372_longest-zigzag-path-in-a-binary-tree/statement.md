# Longest ZigZag Path in a Binary Tree

## Description

You are given the `root` of a binary tree.

A ZigZag path for a binary tree is defined as follows:

1. Choose any node in the binary tree and a direction (right or left).
2. If the current direction is right, move to the right child of the current
   node; otherwise, move to the left child.
3. Change the direction from right to left or from left to right.
4. Repeat the second and third steps until you can't move in the tree.

Zigzag length is defined as the number of nodes visited minus 1. (A single node
has a length of 0.)

Return the longest ZigZag path contained in that tree.

### Example 1

![diagram](figures/1372-1.svg)

```text
Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
Output: 3
Explanation: The longest ZigZag path goes right -> left -> right.
```

### Example 2

![diagram](figures/1372-2.svg)

```text
Input: root = [1,1,1,null,1,null,null,1,1,null,1]
Output: 4
Explanation: The longest ZigZag path goes left -> right -> left -> right.
```

### Example 3

```text
Input: root = [1]
Output: 0
```

### Constraints

- The number of nodes in the tree is in the range `[1, 5 * 10^4]`.
- `1 <= Node.val <= 100`

## Hints

### Hint 1

Create this function maxZigZag(node, direction) — the maximum zigzag given a
node and direction (right or left).
