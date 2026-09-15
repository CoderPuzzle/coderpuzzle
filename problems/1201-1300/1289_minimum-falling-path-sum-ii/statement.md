# Minimum Falling Path Sum II

## Description

Given an `n x n` integer matrix `grid`, return the minimum sum of a falling
path with non-zero shifts.

A falling path with non-zero shifts is a choice of exactly one element from
each row of `grid` such that no two elements chosen in adjacent rows are in
the same column.

### Example 1

```text
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation:
The possible falling paths are:
[1,5,9], [1,5,7], [1,6,7], [1,6,8],
[2,4,8], [2,4,9], [2,6,7], [2,6,8],
[3,4,8], [3,4,9], [3,5,7], [3,5,9]
The falling path with the smallest sum is [1,5,7], so the answer is 13.
```

![The 3 x 3 grid of 1 through 9 with the falling path 1 - 5 - 7 highlighted in blue, always shifting column between rows.](figures/example-1.svg)

### Example 2

```text
Input: grid = [[7]]
Output: 7
```

### Constraints

- `n == grid.length == grid[i].length`
- `1 <= n <= 200`
- `-99 <= grid[i][j] <= 99`

## Hints

### Hint 1

Use dynamic programming.

### Hint 2

Let dp[i][j] be the answer for the first i rows such that column j is chosen from row i.

### Hint 3

Use the concept of a cumulative array to optimize the complexity of the solution.
