# Count Submatrices With Equal Frequency of X and Y

## Description

Given a 2D character matrix `grid`, where `grid[i][j]` is either `'X'`,
`'Y'`, or `'.'`, return the number of submatrices that contain:

- `grid[0][0]`
- an equal frequency of `'X'` and `'Y'`.
- at least one `'X'`.

### Example 1

![diagram](figures/3212-1.svg)

```text
Input: grid = [["X","Y","."],["Y",".","."]]
Output: 3
```

### Example 2

```text
Input: grid = [["X","X"],["X","Y"]]
Output: 0
Explanation: No submatrix has an equal frequency of 'X' and 'Y'.
```

### Example 3

```text
Input: grid = [[".","."],[".","."]]
Output: 0
Explanation: No submatrix has at least one 'X'.
```

### Constraints

- `1 <= grid.length, grid[i].length <= 1000`
- `grid[i][j]` is either `'X'`, `'Y'`, or `'.'`.

## Hints

### Hint 1

Replace ’X’ with 1, ’Y’ with -1 and ’.’ with 0.

### Hint 2

You need to find how many submatrices `grid[0..x][0..y]` have a sum of 0
and at least one ’X’.

### Hint 3

Use prefix sum to calculate submatrices sum.
