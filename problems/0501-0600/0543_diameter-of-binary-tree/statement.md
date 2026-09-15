# Diameter of Binary Tree

## Description

Given the `root` of a binary tree, return the length of the diameter of the
tree.

The diameter of a binary tree is the length of the longest path between any
two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges
between them.

### Example 1

```text
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
```

![The tree [1,2,3,4,5] with the diameter path 4-2-1-3 highlighted.](figures/example-1.svg)

### Example 2

```text
Input: root = [1,2]
Output: 1
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-100 <= Node.val <= 100`

## Hints

### Hint 1

The longest path through a node uses one edge to its deepest left descendant and one to its deepest right descendant.

### Hint 2

So the candidate diameter at each node is left height + right height.

### Hint 3

Do a single post-order DFS returning subtree height, tracking the maximum left + right along the way.

### Hint 4

The best path may avoid the root entirely, so do not just combine the two subtree heights of the root.
