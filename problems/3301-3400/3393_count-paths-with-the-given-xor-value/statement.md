# Count Paths With the Given XOR Value

## Description

You are given a 2D integer array `grid` with size `m x n`. You are also given an
integer `k`.

Your task is to calculate the number of paths you can take from the top-left
cell `(0, 0)` to the bottom-right cell `(m - 1, n - 1)` satisfying the
following constraints:

- You can either move to the right or down. Formally, from the cell `(i, j)`
  you may move to the cell `(i, j + 1)` or to the cell `(i + 1, j)` if the
  target cell exists.
- The XOR of all the numbers on the path must be equal to `k`.

Return the total number of such paths.

Since the answer can be very large, return the result modulo `10⁹ + 7`.

### Example 1

```text
Input: grid = [[2,1,5],[7,10,0],[12,6,4]], k = 11
Output: 3
Explanation: The 3 paths are:
(0, 0) → (1, 0) → (2, 0) → (2, 1) → (2, 2)
(0, 0) → (1, 0) → (1, 1) → (1, 2) → (2, 2)
(0, 0) → (0, 1) → (1, 1) → (2, 1) → (2, 2)
```

### Example 2

```text
Input: grid = [[1,3,3,3],[0,3,3,2],[3,0,1,1]], k = 2
Output: 5
Explanation: The 5 paths are:
(0, 0) → (1, 0) → (2, 0) → (2, 1) → (2, 2) → (2, 3)
(0, 0) → (1, 0) → (1, 1) → (2, 1) → (2, 2) → (2, 3)
(0, 0) → (1, 0) → (1, 1) → (1, 2) → (1, 3) → (2, 3)
(0, 0) → (0, 1) → (1, 1) → (1, 2) → (2, 2) → (2, 3)
(0, 0) → (0, 1) → (0, 2) → (1, 2) → (2, 2) → (2, 3)
```

### Example 3

```text
Input: grid = [[1,1,1,2],[3,0,3,2],[3,0,2,2]], k = 10
Output: 0
```

### Constraints

- `1 <= m == grid.length <= 300`
- `1 <= n == grid[r].length <= 300`
- `0 <= grid[r][c] < 16`
- `0 <= k < 16`

## Hints

### Hint 1

Think of a path prefix by its cell (i, j) together with the XOR of all values seen so far on the path.

### Hint 2

Let dp[i][j][x] be the number of paths from the top-left cell to cell (i, j) whose prefix XOR is exactly x; each cell is reached from the cell above or the cell to its left.

### Hint 3

The answer is dp[m - 1][n - 1][k], computed modulo 10^9 + 7.
