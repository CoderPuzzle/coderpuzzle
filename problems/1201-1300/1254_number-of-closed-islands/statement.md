# Number of Closed Islands

## Description

Given a 2D `grid` that consists of `0`s (land) and `1`s (water). An island
is a maximal 4-directionally connected group of `0`s and a closed island is an
island totally (all left, top, right, bottom) surrounded by `1`s.

Return the number of closed islands.

### Example 1

```text
Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
Explanation: Islands in gray are closed because they are completely
surrounded by water (group of 1s).
```

![The 5 x 8 grid with water tinted blue and the two closed islands of 0s in gray: the ring around the center and the single cell at (3, 6).](figures/example-1.svg)

### Example 2

```text
Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
Output: 1
```

![The 3 x 5 grid with water tinted blue; only the single 0 at (1, 2) is a closed island.](figures/example-2.svg)

### Example 3

```text
Input: grid = [[1,1,1,1,1,1,1],
               [1,0,0,0,0,0,1],
               [1,0,1,1,1,0,1],
               [1,0,1,0,1,0,1],
               [1,0,1,1,1,0,1],
               [1,0,0,0,0,0,1],
               [1,1,1,1,1,1,1]]
Output: 2
```

### Constraints

- `1 <= grid.length, grid[0].length <= 100`
- `0 <= grid[i][j] <= 1`

## Hints

### Hint 1

Exclude connected groups of 0s that touch the grid border because they are not closed islands.

### Hint 2

Return the number of the remaining connected components of 0s in the grid.
