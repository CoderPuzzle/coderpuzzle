# Unique Binary Search Trees II

## Description

Given an integer `n`, return all the structurally unique BST's (binary search
trees), which has exactly n nodes of unique values from 1 to n.

Return the trees in the order the examples show: root values run from `1` to
`n`, and for each root every left-subtree choice is paired with every
right-subtree choice, the left choice varying slower than the right, each
side's list following the same rule recursively.

### Example 1

![diagram](figures/95-1.svg)

```text
Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
```

### Example 2

```text
Input: n = 1
Output: [[1]]
```

### Constraints

- `1 <= n <= 8`
