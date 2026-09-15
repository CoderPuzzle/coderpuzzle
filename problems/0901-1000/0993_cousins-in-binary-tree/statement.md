# Cousins in Binary Tree

## Description

Given the `root` of a binary tree with unique values, and the values of two
different nodes of the tree `x` and `y`, return `true` if the nodes
corresponding to the values `x` and `y` in the tree are cousins, or `false`
otherwise.

Two nodes of a binary tree are cousins if they have the same depth with
different parents.

Note that in a binary tree, the root node is at the depth 0, and children of
each depth `k` node are at the depth `k + 1`.

### Example 1

![diagram](figures/993-1.svg)

```text
Input: root = [1,2,3,4], x = 4, y = 3
Output: false
Explanation: The node with value 4 sits at depth 2 while the node with value
3 sits at depth 1, so the two nodes are not at the same depth.
```

### Example 2

![diagram](figures/993-2.svg)

```text
Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
Output: true
Explanation: The nodes with values 5 and 4 both sit at depth 2, and their
parents are different nodes (3 and 2).
```

### Example 3

![diagram](figures/993-3.svg)

```text
Input: root = [1,2,3,null,4], x = 2, y = 3
Output: false
Explanation: The nodes with values 2 and 3 both sit at depth 1, but they
share the root as their parent.
```

### Constraints

- The number of nodes in the tree is in the range `[2, 100]`.
- `1 <= Node.val <= 100`
- Each node has a unique value.
- `x != y`
- Both `x` and `y` exist in the tree.
