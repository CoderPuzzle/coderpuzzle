# Minimum Number of Flips to Make Binary Grid Palindromic I

## Description

You are given an `m x n` binary matrix `grid`.

A row or column is considered palindromic if its values read the same
forward and backward.

You can flip any number of cells in `grid` from `0` to `1`, or from `1`
to `0`.

Return the minimum number of cells that need to be flipped to make either
all rows palindromic or all columns palindromic.

### Example 1

![diagram](figures/3239-1.svg)

```text
Input: grid = [[1,0,0],[0,0,0],[0,0,1]]
Output: 2
Explanation: Flipping the highlighted cells makes all the rows
palindromic.
```

### Example 2

![diagram](figures/3239-2.svg)

```text
Input: grid = [[0,1],[0,1],[0,0]]
Output: 1
Explanation: Flipping the highlighted cell makes all the columns
palindromic.
```

### Example 3

```text
Input: grid = [[1],[0]]
Output: 0
Explanation: All rows are already palindromic.
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m * n <= 2 * 10⁵`
- `0 <= grid[i][j] <= 1`

## Hints

### Hint 1

We need to perform the operation only when the equivalent element of i from
the back is not equal.
