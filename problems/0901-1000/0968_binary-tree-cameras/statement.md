# Binary Tree Cameras

## Description

You are given the `root` of a binary tree. We install cameras on the tree nodes
where each camera at a node can monitor its parent, itself, and its immediate
children.

Return the minimum number of cameras needed to monitor all nodes of the tree.

### Example 1

```text
Input: root = [0,0,null,0,0]
Output: 1
Explanation: One camera is enough to monitor all nodes if placed as shown.
```

![A small tree with one camera node on the middle level covering the root and both leaves.](figures/example-1.svg)

### Example 2

```text
Input: root = [0,0,null,0,null,0,null,null,0]
Output: 2
Explanation: At least two cameras are needed to monitor all nodes of the tree.
One valid configuration places cameras on the two children that each cover a
leaf-heavy branch.
```

![A five-node chain with cameras on the second and fourth nodes covering the whole tree.](figures/example-2.svg)

### Constraints

- The number of nodes in the tree is in the range `[1, 1000]`.
- `Node.val == 0`

## Hints

### Hint 1

Process the tree bottom-up: decisions at a node depend only on the states of its children.

### Hint 2

Give each subtree one of three states — uncovered, has a camera, or covered without a camera.

### Hint 3

If any child is uncovered, the current node must place a camera; if any child has a camera, the current node is covered; otherwise it stays uncovered and asks its parent for coverage.

### Hint 4

If the root itself ends up uncovered, add one final camera there.
