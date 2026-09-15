# Count Fertile Pyramids in a Land

## Description

A farmer has a rectangular grid of land with m rows and n columns that can be divided into unit cells. Each cell is either fertile (represented by a 1) or barren (represented by a 0). All cells outside the grid are considered barren.

A pyramidal plot of land can be defined as a set of cells with the following criteria:

- The number of cells in the set has to be greater than 1 and all cells must be fertile.
- The apex of a pyramid is the topmost cell of the pyramid. The height of a pyramid is the number of rows it covers. Let (r, c) be the apex of the pyramid, and its height be h. Then, the plot comprises of cells (i, j) where r <= i <= r + h - 1 and c - (i - r) <= j <= c + (i - r).

An inverse pyramidal plot of land can be defined as a set of cells with similar criteria:

- The number of cells in the set has to be greater than 1 and all cells must be fertile.
- The apex of an inverse pyramid is the bottommost cell of the inverse pyramid. The height of an inverse pyramid is the number of rows it covers. Let (r, c) be the apex of the pyramid, and its height be h. Then, the plot comprises of cells (i, j) where r - h + 1 <= i <= r and c - (r - i) <= j <= c + (r - i).

![diagram](figures/2088-1.svg)

Given a 0-indexed m x n binary matrix grid representing the farmland, return the total number of pyramidal and inverse pyramidal plots that can be found in grid.

### Example 1

![diagram](figures/2088-2.svg)

```text
Input: grid = [[0,1,1,0],[1,1,1,1]]
Output: 2
Explanation: There are 2 possible pyramidal plots.
There are no inverse pyramidal plots in this grid.
Hence total number of pyramidal and inverse pyramidal plots is 2 + 0 = 2.
```

### Example 2

![diagram](figures/2088-3.svg)

```text
Input: grid = [[1,1,1],[1,1,1]]
Output: 2
Explanation: There is one pyramidal plot and one inverse pyramidal plot.
Hence the total number of plots is 1 + 1 = 2.
```

### Example 3

![diagram](figures/2088-4.svg)

```text
Input: grid = [[1,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,0,0,1]]
Output: 13
Explanation: There are 7 pyramidal plots and 6 inverse pyramidal plots.
The total number of plots is 7 + 6 = 13.
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 1000`
- `1 <= m * n <= 10⁵`
- `grid[i][j]` is either 0 or 1.

## Hints

### Hint 1

Think about how dynamic programming can help solve the problem.

### Hint 2

For any fixed cell (r, c), can you calculate the maximum height of the pyramid for which it is the apex? Let us denote this value as dp[r][c].

### Hint 3

How will the values at dp[r+1][c-1] and dp[r+1][c+1] help in determining the value at dp[r][c]?

### Hint 4

For the cell (r, c), is there a relation between the number of pyramids for which it serves as the apex and dp[r][c]? How does it help in calculating the answer?
