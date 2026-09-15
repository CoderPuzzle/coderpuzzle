# Count Submatrices with Top-Left Element and Sum Less Than k

## Description

You are given a 0-indexed integer matrix `grid` and an integer `k`.

Return the number of submatrices that contain the top-left element of the
grid, and have a sum less than or equal to `k`.

### Example 1

```text
Input: grid = [[7,6,3],[6,6,1]], k = 18
Output: 4
Explanation: There are only 4 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 18.
```

![The four qualifying submatrices, of sizes 1x1, 1x2, 1x3 and 2x1, with sums 7, 13, 16 and 13.](figures/example-1.svg)

### Example 2

```text
Input: grid = [[7,2,9],[1,5,0],[2,6,6]], k = 20
Output: 6
Explanation: There are only 6 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 20.
```

![The six qualifying submatrices, of sizes 1x1 up to 3x1, with sums 7, 9, 18, 8, 15 and 10.](figures/example-2.svg)

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= n, m <= 1000`
- `0 <= grid[i][j] <= 1000`
- `1 <= k <= 10^9`

## Hints

### Hint 1

Build a 2D prefix-sum array: the submatrix containing the top-left element with bottom-right corner (i, j) has sum equal to the prefix sum at (i, j).

### Hint 2

Since all grid values are non-negative, the prefix sums along a row never decrease, so you can stop extending a row once the sum exceeds k.
