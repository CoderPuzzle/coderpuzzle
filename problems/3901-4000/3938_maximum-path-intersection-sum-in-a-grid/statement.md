# Maximum Path Intersection Sum in a Grid

## Description

You are given an `m x n` integer matrix `grid`.

Player 1 moves from `(0, 0)` to `(m - 1, n - 1)` using only right or down moves. Player 2 moves from `(m - 1, 0)` to `(0, n - 1)` using only right or up moves. Each player chooses one valid path. A cell is shared if it belongs to both paths.

Return the maximum possible sum of the values of all shared cells.

### Example 1

![diagram](figures/3938-1.svg)

```text
Input: grid = [[1,2,0,-3],[1,-2,1,0],[-4,2,-1,3],[3,-3,3,-2],[-1,-5,0,1]]
Output: 4
```

### Example 2

![diagram](figures/3938-2.svg)

```text
Input: grid = [[4,-2,-3],[-1,-3,-1],[-4,2,-1]]
Output: 3
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 1000`
- `4 <= m * n <= 5 * 10⁵`
- `-100 <= grid[i][j] <= 100`

## Hints

### Hint 1

Shared cells are contiguous and lie on one row or one column.

### Hint 2

A single shared cell must be off every boundary.

### Hint 3

Reduce rows and columns to maximum-subarray queries of length at least two, then handle a single cell separately.
