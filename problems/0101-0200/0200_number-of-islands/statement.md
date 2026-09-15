# Number of Islands

## Description

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land)
and `'0'`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands
horizontally or vertically. You may assume all four edges of the grid are all
surrounded by water.

### Example 1

```text
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

### Example 2

```text
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`.

## Hints

### Hint 1

Scan every cell; when you find an unvisited '1', you have discovered a brand-new island.

### Hint 2

Flood-fill (DFS or BFS) every horizontally and vertically connected land cell so the whole island is consumed at once.

### Hint 3

Marking visited cells — in place or with a separate structure — prevents counting the same island twice.
