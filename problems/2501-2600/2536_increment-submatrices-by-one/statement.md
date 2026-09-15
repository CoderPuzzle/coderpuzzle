# Increment Submatrices by One

## Description

You are given a positive integer `n`, indicating that we initially have an
`n x n` 0-indexed integer matrix `mat` filled with zeroes.

You are also given a 2D integer array `queries`. For each
`queries[i] = [row1i, col1i, row2i, col2i]`, you should do the following
operation:

- Add `1` to every element in the submatrix with the top left corner
  `(row1i, col1i)` and the bottom right corner `(row2i, col2i)`. That is,
  add `1` to `mat[x][y]` for all `row1i <= x <= row2i` and
  `col1i <= y <= col2i`.

Return the matrix `mat` after performing every query.

### Example 1

```text
Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
Output: [[1,1,0],[1,2,1],[0,1,1]]
Explanation: The diagram above shows the initial matrix, the matrix after the
first query, and the matrix after the second query.
- In the first query, we add 1 to every element in the submatrix with the top
  left corner (1, 1) and bottom right corner (2, 2).
- In the second query, we add 1 to every element in the submatrix with the
  top left corner (0, 0) and bottom right corner (1, 1).
```

![The matrix evolves 0s -> +1 on rows 1-2 / cols 1-2 -> +1 on rows 0-1 / cols 0-1, ending at [[1,1,0],[1,2,1],[0,1,1]].](figures/example-1.svg)

### Example 2

```text
Input: n = 2, queries = [[0,0,1,1]]
Output: [[1,1],[1,1]]
Explanation: We add 1 to every element in the matrix.
```

![A 2x2 matrix of zeros becomes all ones after the single query [0,0,1,1].](figures/example-2.svg)

### Constraints

- `1 <= n <= 500`
- `1 <= queries.length <= 10⁴`
- `0 <= row1i <= row2i < n`
- `0 <= col1i <= col2i < n`

## Hints

### Hint 1

Imagine each row as a separate array. Instead of updating the whole submatrix at once, apply a 1-D difference array to each row independently.

### Hint 2

For each query and each row i in [row1, row2], add 1 to diff[i][col1] and subtract 1 from diff[i][col2 + 1].

### Hint 3

After all queries, restore each row with a running prefix sum: mat[i][j] = mat[i][j-1] + diff[i][j].
