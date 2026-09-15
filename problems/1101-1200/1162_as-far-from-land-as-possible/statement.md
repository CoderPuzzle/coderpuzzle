# As Far from Land as Possible

## Description

Given an `n x n` grid containing only values `0` and `1`, where `0`
represents water and `1` represents land, find a water cell such that its
distance to the nearest land cell is maximized, and return that distance. If
no land or water exists in the grid, return `-1`.

The distance used in this problem is the Manhattan distance: the distance
between two cells `(x0, y0)` and `(x1, y1)` is `|x0 - x1| + |y0 - y1|`.

### Example 1

```text
Input: grid = [[1,0,1],[0,0,0],[1,0,1]]
Output: 2
Explanation: The cell (1, 1) is as far as possible from all the land with distance 2.
```

![The 3 x 3 grid with land at the four corners and the center water cell (1, 1) highlighted, 2 away from the nearest land.](figures/example-1.svg)

### Example 2

```text
Input: grid = [[1,0,0],[0,0,0],[0,0,0]]
Output: 4
Explanation: The cell (2, 2) is as far as possible from all the land with distance 4.
```

![The 3 x 3 grid with a single land cell in the top-left corner and the bottom-right water cell (2, 2) highlighted, 4 away from the only land.](figures/example-2.svg)

### Constraints

- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 100`
- `grid[i][j]` is `0` or `1`

## Hints

### Hint 1

Think about the problem backwards: instead of measuring from each water cell, expand outward from the land.

### Hint 2

Run a BFS that starts from all land cells at the same time.

### Hint 3

The last water cell the BFS reaches is the farthest one; the number of BFS levels it sits at is the answer.

### Hint 4

Handle the degenerate grids first: all water or all land returns -1.
