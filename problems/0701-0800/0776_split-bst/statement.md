# Split BST

## Description

You are given the `root` of a binary search tree (BST) and an integer
`target`. Split the tree into two subtrees where the first subtree has all
nodes with values smaller than or equal to `target`, while the second subtree
has all nodes with values greater than `target`. The tree does not
necessarily contain a node with the value `target`.

Additionally, most of the structure of the original tree should remain:
for any child `c` with parent `p` in the original tree, if they are both in
the same subtree after the split, then node `c` should still have the parent
`p`.

Return an array of the two roots of the two subtrees in order — the subtree
of smaller-or-equal values first, the subtree of greater values second. An
empty subtree is rendered as `[]`.

### Example 1

![diagram](figures/776-1.svg)

```text
Input: root = [4,2,6,1,3,5,7], target = 2
Output: [[2,1],[4,3,6,null,null,5,7]]
Explanation: The nodes with values 1 and 2 are at most the target, so they
form the first tree; the rest is greater than the target and keeps its shape,
with 3 taking the place 2 left under 4.
```

### Example 2

```text
Input: root = [1], target = 1
Output: [[1],[]]
Explanation: The single node is at most the target, so the second subtree is
empty.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 50]`.
- `0 <= Node.val, target <= 1000`

## Hints

### Hint 1

Use recursion. If `root.val <= target`, split `root.right` into two halves,
then join its first half back onto `root.right`.
