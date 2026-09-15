# Smallest Subtree with all the Deepest Nodes

## Description

Given the `root` of a binary tree, the depth of each node is the shortest
distance to the root.

Return the smallest subtree such that it contains all the deepest nodes in
the original tree. A node is called the deepest if it has the largest depth
possible among any node in the entire tree.

The subtree of a node is a tree consisting of that node, plus the set of all
descendants of that node.

### Example 1

![diagram](figures/865-1.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: The deepest nodes are 7 and 4. The nodes 5, 3 and 2 each
contain both of them in their subtree, but the subtree of node 2 is the
smallest among them, so it is returned.
```

### Example 2

```text
Input: root = [1]
Output: [1]
Explanation: The root is the deepest node in the tree.
```

### Example 3

```text
Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest node in the tree is 2; the subtrees of nodes 2, 1
and 0 all contain it, but the subtree of node 2 is the smallest.
```

### Constraints

- The number of nodes in the tree will be in the range `[1, 500]`.
- `0 <= Node.val <= 500`
- The values of the nodes in the tree are unique.
