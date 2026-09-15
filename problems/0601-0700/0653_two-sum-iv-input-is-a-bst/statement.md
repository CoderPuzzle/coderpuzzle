# Two Sum IV - Input is a BST

## Description

Given the `root` of a binary search tree and an integer `k`, return `true` if
there exist two elements in the BST such that their sum is equal to `k`, or
`false` otherwise.

### Example 1

![diagram](figures/653-1.svg)

```text
Input: root = [5,3,6,2,4,null,7], k = 9
Output: true
```

### Example 2

![diagram](figures/653-2.svg)

```text
Input: root = [5,3,6,2,4,null,7], k = 28
Output: false
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁴]`.
- `-10⁴ <= Node.val <= 10⁴`
- `root` is guaranteed to be a valid binary search tree.
- `-10⁵ <= k <= 10⁵`
