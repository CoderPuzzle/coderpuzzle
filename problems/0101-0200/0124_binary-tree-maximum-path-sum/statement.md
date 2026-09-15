# Binary Tree Maximum Path Sum

## Description

A **path** in a binary tree is a sequence of nodes where each pair of
adjacent nodes in the sequence has an edge connecting them. A node can only
appear in the sequence **at most once**. Note that the path does not need to
pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the `root` of a binary tree, return the maximum path sum of any
non-empty path.

### Example 1

```text
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
```

![The tree 1, 2, 3 with the path 2 -> 1 -> 3 highlighted.](figures/example-1.svg)

### Example 2

```text
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
```

![The tree rooted at -10 with the path 15 -> 20 -> 7 highlighted.](figures/example-2.svg)

### Constraints

- The number of nodes in the tree is in the range `[1, 3 * 10^4]`.
- `-1000 <= Node.val <= 1000`

## Hints

### Hint 1

For each node, compute the best gain of a path that starts at the node and extends down into at most one child.

### Hint 2

A path may bend through the node by joining its best left gain and best right gain; treat negative child gains as 0.

### Hint 3

Track the best bend value seen anywhere while returning only the single-side gain up the recursion.
