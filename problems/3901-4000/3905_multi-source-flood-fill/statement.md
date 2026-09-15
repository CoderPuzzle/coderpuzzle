# Multi Source Flood Fill

## Description

You are given two integers `n` and `m` representing the number of rows and
columns of a grid, respectively.

You are also given a 2D integer array `sources`, where
`sources[i] = [ri, ci, colori]` indicates that the cell `(ri, ci)` is initially
colored with `colori`. All other cells are initially uncolored and represented
as `0`.

At each time step, every currently colored cell spreads its color to all
adjacent uncolored cells in the four directions: up, down, left, and right.
All spreads happen simultaneously.

If multiple colors reach the same uncolored cell at the same time step, the
cell takes the color with the maximum value.

The process continues until no more cells can be colored.

Return a 2D integer array representing the final state of the grid, where each
cell contains its final color.

### Example 1

```text
Input: n = 3, m = 3, sources = [[0,0,1],[2,2,2]]
Output: [[1,1,2],[1,2,2],[2,2,2]]
Explanation:
At time step 2, cells (0, 2), (1, 1), and (2, 0) are reached by both colors, so
they are assigned color 2 as it has the maximum value among them.
```

![Three 3x3 grids at t = 0, 1, and 2; the two sources spread step by step, and at t = 2 the three doubly-reached cells take the larger color 2.](figures/example-1.svg)

### Example 2

```text
Input: n = 3, m = 3, sources = [[0,1,3],[1,1,5]]
Output: [[3,3,3],[5,5,5],[5,5,5]]
```

![Three 3x3 grids at t = 0, 1, and 2; color 3 claims the top row at t = 1 before color 5 can arrive, and color 5 fills everything else by t = 2.](figures/example-2.svg)

### Example 3

```text
Input: n = 2, m = 2, sources = [[1,1,5]]
Output: [[5,5],[5,5]]
Explanation:
Since there is only one source, all cells are assigned the same color.
```

![Three 2x2 grids at t = 0, 1, and 2; the single source floods the whole grid by t = 2, leaving every cell 5.](figures/example-3.svg)

### Constraints

- `1 <= n, m <= 10^5`
- `1 <= n * m <= 10^5`
- `1 <= sources.length <= n * m`
- `sources[i] = [ri, ci, colori]`
- `0 <= ri <= n - 1`
- `0 <= ci <= m - 1`
- `1 <= colori <= 10^6`
- All `(ri, ci)` in `sources` are distinct.

## Hints

### Hint 1

Run a multi-source BFS.

### Hint 2

Initialize a queue with all colored cells.

### Hint 3

Spread colors level by level to adjacent cells in the four directions.

### Hint 4

If multiple colors reach the same cell at the same time step, assign the maximum color value.
