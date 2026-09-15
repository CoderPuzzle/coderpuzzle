# All Nodes Distance K in Binary Tree

## Description

Given the `root` of a binary tree, the value of a target node `target`, and
an integer `k`, return an array of the values of all nodes that have a
distance `k` from the target node.

The distance between two nodes is the number of edges on the path from one
to the other, and a path may run upward through a parent as well as downward
through a child — the tree is treated as an undirected graph. Return the
values in ascending order.

### Example 1

![diagram](figures/863-1.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [1,4,7]
Explanation: The nodes at a distance 2 from the target node (value 5) have
values 7, 4, and 1 — two of them below the target through node 2, and one
reached by climbing to the root's other side.
```

### Example 2

```text
Input: root = [1], target = 1, k = 3
Output: []
Explanation: The lone node sits at distance 0 from itself, and there is no
other node, so nothing lies at distance 3.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 500]`.
- `0 <= Node.val <= 500`
- All the values `Node.val` are unique.
- `target` is the value of one of the nodes in the tree.
- `0 <= k <= 1000`
