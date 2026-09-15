# Matrix Block Sum

## Description

Given a `m x n` matrix `mat` and an integer `k`, return a matrix `answer` where each `answer[i][j]` is the sum of all elements `mat[r][c]` for:

- `i - k <= r <= i + k`
- `j - k <= c <= j + k`
- `(r, c)` is a valid position in the matrix

### Example 1

```text
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[12,21,16],[27,45,33],[24,39,28]]
```

### Example 2

```text
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2
Output: [[45,45,45],[45,45,45],[45,45,45]]
```

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n, k <= 100`
- `1 <= mat[i][j] <= 100`

## Hints

### Hint 1

How to calculate the required sum for a cell (i, j) fast?

### Hint 2

Use the concept of a cumulative sum array.

### Hint 3

Create a cumulative sum matrix where dp[i][j] is the sum of all cells in the rectangle from (0,0) to (i,j), using inclusion-exclusion.
