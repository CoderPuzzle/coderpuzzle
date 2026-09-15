# Check if There is a Path With Equal Number of 0's And 1's

## Description

You are given a 0-indexed m x n binary matrix grid. You can move from a
cell (row, col) to any of the cells (row + 1, col) or (row, col + 1).

Return true if there is a path from (0, 0) to (m - 1, n - 1) that visits
an equal number of 0's and 1's. Otherwise return false.

### Example 1

![diagram](figures/2510-1.svg)

```text
Input: grid = [[0,1,0,0],[0,1,0,0],[1,0,1,0]]
Output: true
Explanation: The path colored in blue in the above diagram is a valid path because we have 3 cells with a value of 1 and 3 with a value of 0. Since there is a valid path, we return true.
```

### Example 2

![diagram](figures/2510-2.svg)

```text
Input: grid = [[1,1,0],[0,0,1],[1,0,0]]
Output: false
Explanation: There is no path in this grid with an equal number of 0's and 1's.
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 100`
- `grid[i][j]` is either 0 or 1.

## Hints

### Hint 1

Can you use dynamic programming to solve the problem?

### Hint 2

Let dp[i][j][diff] be true if there is a path from the cell (i, j) to
(m - 1, n - 1) such that the difference between the number of 0’s and the
number of 1’s that we visited so far is diff, or false otherwise. The
answer to the problem will be dp[0][0][0]. How do you compute this dp?
