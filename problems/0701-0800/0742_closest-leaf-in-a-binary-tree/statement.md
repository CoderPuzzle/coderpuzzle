# Closest Leaf in a Binary Tree

## Description

You are given the `root` of a binary tree in which every node has a unique
value, and a target integer `k`. Return the value of the leaf node nearest
to the node whose value is `k`.

Nearness to a leaf is measured by the number of edges traveled along the
tree, and travel runs in any direction — up through a parent as well as
down through a child. A node is a leaf when it has no children. When
several leaves lie at the same smallest distance, the leaf with the
smallest value is the answer.

### Example 1

![diagram](figures/742-1.svg)

```text
Input: root = [1,3,2], k = 1
Output: 2
Explanation: The leaves 3 and 2 are both one edge from the node 1; the
smaller value, 2, is the answer.
```

### Example 2

![diagram](figures/742-2.svg)

```text
Input: root = [1], k = 1
Output: 1
Explanation: The root has no children, so it is itself the nearest leaf —
zero edges away.
```

### Example 3

![diagram](figures/742-3.svg)

```text
Input: root = [1,2,3,4,null,null,null,5,null,6], k = 2
Output: 3
Explanation: The leaf 3 is two edges away up through the root, while the
leaf 6 is three edges down the left chain, so 3 is nearest.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 1000]`.
- `1 <= Node.val <= 1000`
- All the values in the tree are unique.
- There exists some node in the tree where `Node.val == k`.

## Hints

### Hint 1

Turn the tree into an undirected graph and search outward from the target
node breadth-first. Alternatively, find the closest leaf for every node on
the path from the root to the target.
