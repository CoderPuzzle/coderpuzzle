# Complete Binary Tree Inserter

## Description

A complete binary tree is a binary tree whose levels are all full except
possibly the last — and the last level's nodes sit as far left as
possible, so reading the tree level by level, left to right, visits the
nodes in exactly the order a perfect tree's first `n` positions appear.

Design a data structure that starts from a complete binary tree and
keeps it complete while nodes are added one at a time.

Implement the `CBTInserter` class:

- `CBTInserter(TreeNode root)` — initialize the data structure with the
  root of a complete binary tree.
- `int insert(int v)` — insert a node with value `v` at the position
  that keeps the tree complete, and return the value of the new node's
  parent.
- `TreeNode get_root()` — return the root node of the tree.

The tree reaches your constructor already assembled from its nodes. In
the examples a tree is written as its level-order listing, where `null`
stands for an absent child; children of absent nodes are skipped and
trailing `null`s are dropped.

### Example 1

![diagram](figures/919-1.svg)

```text
Input
["CBTInserter", "insert", "insert", "get_root"]
[[[1, 2]], [3], [4], []]
Output
[null, 1, 2, [1, 2, 3, 4]]
Explanation
CBTInserter cBTInserter = new CBTInserter([1, 2]);
cBTInserter.insert(3);  // return 1
cBTInserter.insert(4);  // return 2
cBTInserter.get_root(); // return [1, 2, 3, 4]
```

### Constraints

- The number of nodes in the tree will be in the range `[1, 1000]`.
- `0 <= Node.val <= 5000`
- `root` is a complete binary tree.
- `0 <= v <= 5000`
- At most `10⁴` calls will be made to `insert` and `get_root`.
