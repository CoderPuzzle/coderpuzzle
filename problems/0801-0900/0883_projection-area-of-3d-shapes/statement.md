# Projection Area of 3D Shapes

## Description

You are given an `n x n` grid where we place some `1 x 1 x 1` cubes that are
axis-aligned with the `x`, `y`, and `z` axes. Each value `v = grid[i][j]`
represents a tower of `v` cubes placed on top of the cell `(i, j)`.

We view the projection of these cubes onto the `xy`, `yz`, and `zx` planes.
A projection is like a shadow that maps our 3-dimensional figure to a
2-dimensional plane — we are viewing the "shadow" when looking at the cubes
from the top, the front, and the side.

Return the total area of all three projections.

### Example 1

![diagram](figures/883-1.svg)

```text
Input: grid = [[1,2],[3,4]]
Output: 17
Explanation: Seen from the top, every one of the 4 cells holds a tower. The
tallest tower in each row is 2 and 4, and the tallest tower in each column
is 3 and 4, so the total area is 4 + 6 + 7 = 17.
```

### Example 2

```text
Input: grid = [[2]]
Output: 5
Explanation: The single tower of height 2 contributes 1 from the top and 2
from each of the other two views, for 1 + 2 + 2 = 5.
```

### Example 3

```text
Input: grid = [[1,0],[0,2]]
Output: 8
Explanation: Both diagonal cells hold towers, the row maxima are 1 and 2,
and the column maxima are 1 and 2, so the total area is 2 + 3 + 3 = 8.
```

### Constraints

- `n == grid.length == grid[i].length`
- `1 <= n <= 50`
- `0 <= grid[i][j] <= 50`
