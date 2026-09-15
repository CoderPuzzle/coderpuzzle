# Maximum Consistent Columns in a Grid

## Description

You are given a 2D integer array `grid` of size `m x n`, and an integer
`limit`.

You may remove zero or more columns from the grid, but at least one column
must remain. The relative order of the remaining columns must be preserved.

A grid is called consistent if for every row `i`, and for every pair of
adjacent remaining columns `a` and `b` with `a < b`, the following holds:
`|grid[i][b] - grid[i][a]| <= limit`.

Return the maximum number of columns that can remain such that the resulting
grid is consistent.

### Example 1

```text
Input: grid = [[-2,0,3]], limit = 2
Output: 2
Explanation:
    Remove column 2 and keep columns 0 and 1, which gives
    |grid[0][1] - grid[0][0]| = |0 - (-2)| = 2 <= limit.
    Thus, the maximum number of columns that can remain is 2.
```

### Example 2

```text
Input: grid = [[1,-1,1],[2,2,2]], limit = 1
Output: 2
Explanation:
    Remove column 1 and keep columns 0 and 2, which gives
        |grid[0][2] - grid[0][0]| = |1 - 1| = 0 <= limit and
        |grid[1][2] - grid[1][0]| = |2 - 2| = 0 <= limit.

    Thus, the maximum number of columns that can remain is 2.
```

### Example 3

```text
Input: grid = [[-5,5]], limit = 9
Output: 1
Explanation:
    Remove either column 0 or column 1, since
    |grid[0][1] - grid[0][0]| = |5 - (-5)| = 10 > limit.
    Thus, the maximum number of columns that can remain is 1.
```

### Constraints

- `1 <= m == grid.length <= 250`
- `1 <= n == grid[i].length <= 250`
- `-10⁵ <= grid[i][j] <= 10⁵`
- `0 <= limit <= 10⁵`

## Hints

### Hint 1

Think of each column as one item in a subsequence. Two columns `a` and `b`
with `a < b` can be adjacent in the remaining grid only if
`|grid[i][b] - grid[i][a]| <= limit` for every row `i`.

### Hint 2

Precompute whether every pair of columns `(a, b)` is compatible.

### Hint 3

Let `dp[j]` be the maximum number of columns in a valid remaining grid whose
last column is `j`.

### Hint 4

For each `j`, try all previous columns `i < j`. If columns `i` and `j` are
compatible, update `dp[j] = max(dp[j], dp[i] + 1)`.
