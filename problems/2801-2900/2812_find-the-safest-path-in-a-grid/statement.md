# Find the Safest Path in a Grid

## Description

You are given a 0-indexed 2D matrix `grid` of size `n x n`, where `(r, c)`
represents:

- A cell containing a thief if `grid[r][c] = 1`
- An empty cell if `grid[r][c] = 0`

You are initially positioned at cell `(0, 0)`. In one move, you can move to
any adjacent cell in the grid, including cells containing thieves.

The safeness factor of a path on the grid is defined as the minimum manhattan
distance from any cell in the path to any thief in the grid.

Return the maximum safeness factor of all paths leading to cell
`(n - 1, n - 1)`.

An adjacent cell of cell `(r, c)`, is one of the cells `(r, c + 1)`,
`(r, c - 1)`, `(r + 1, c)` and `(r - 1, c)` if it exists.

The Manhattan distance between two cells `(a, b)` and `(x, y)` is equal to
`|a - x| + |b - y|`, where `|val|` denotes the absolute value of `val`.

### Example 1

```text
Input: grid = [[1,0,0],[0,0,0],[0,0,1]]
Output: 0
Explanation: All paths from (0, 0) to (n - 1, n - 1) go through the thieves in cells (0, 0) and (n - 1, n - 1).
```

![The start and the destination corners are themselves thieves, so every path has safeness factor 0.](figures/example-1.svg)

### Example 2

```text
Input: grid = [[0,0,1],[0,0,0],[0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 2) is cell (0, 0). The distance between them is | 0 - 0 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.
```

![The path down the left column and across the bottom keeps every cell at manhattan distance 2 from the thief at (0, 2).](figures/example-2.svg)

### Example 3

```text
Input: grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 3) is cell (1, 2). The distance between them is | 0 - 1 | + | 3 - 2 | = 2.
- The closest cell of the path to the thief at cell (3, 0) is cell (3, 2). The distance between them is | 3 - 3 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.
```

![The staircase path from (0, 0) to (3, 3) stays exactly 2 cells away from both thieves.](figures/example-3.svg)

### Constraints

- `1 <= grid.length == n <= 400`
- `grid[i].length == n`
- `grid[i][j]` is either `0` or `1`.
- There is at least one thief in the grid.

## Hints

### Hint 1

Consider using both BFS and binary search together.

### Hint 2

Launch a BFS starting from all the cells containing thieves to compute d[x][y], the smallest Manhattan distance from (x, y) to the nearest cell containing a thief.

### Hint 3

To check whether the bottom-right cell can be reached through a path of safeness factor v, remove all cells whose distance to the nearest thief is less than v, then test whether (0, 0) and (n - 1, n - 1) stay connected.

### Hint 4

Binary search over the final safeness factor v.
