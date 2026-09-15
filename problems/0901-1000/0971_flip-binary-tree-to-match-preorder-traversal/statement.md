# Flip Binary Tree To Match Preorder Traversal

## Description

You are given the `root` of a binary tree with `n` nodes, where each node is
uniquely assigned a value from `1` to `n`. You are also given an array of `n`
integers `voyage`, the desired preorder traversal of the tree.

Any node in the tree can be flipped by swapping its left and right subtrees.

![diagram](figures/971-1.svg)

Flip the smallest number of nodes so that the preorder traversal of the tree
matches `voyage`, and return the values of the flipped nodes in the order they
appear in the preorder traversal of the resulting tree. If it is impossible
to flip the nodes so that the preorder traversal matches `voyage`, return
`[-1]`.

### Example 1

![diagram](figures/971-2.svg)

```text
Input: root = [1,2], voyage = [2,1]
Output: [-1]
Explanation: No way of flipping the nodes makes the preorder traversal match
voyage.
```

### Example 2

![diagram](figures/971-3.svg)

```text
Input: root = [1,2,3], voyage = [1,3,2]
Output: [1]
Explanation: Flipping node 1 swaps nodes 2 and 3, so the preorder traversal
matches voyage.
```

### Example 3

![diagram](figures/971-4.svg)

```text
Input: root = [1,2,3], voyage = [1,2,3]
Output: []
Explanation: The tree's preorder traversal already matches voyage, so no nodes
need to be flipped.
```

### Constraints

- The number of nodes in the tree is `n`.
- `n == voyage.length`
- `1 <= n <= 100`
- `1 <= Node.val, voyage[i] <= n`
- All the values in the tree are unique.
- All the values in `voyage` are unique.
