# Spiral Matrix III

## Description

You are given a `rows x cols` grid and a starting cell `(rStart, cStart)` on
it. The northwest corner of the grid sits at the first row and first column,
and the southeast corner at the last row and last column.

You start on `(rStart, cStart)` facing east and walk in a clockwise spiral:
one step east, turn right, one step south, turn right, two steps west, turn
right, two steps north, and so on, each straight run growing by one step every
second turn. Whenever the walk carries you past the grid's boundary, keep
walking outside the grid — the spiral only reaches the cells far from the
start by leaving the grid and re-entering it later. Eventually every one of
the `rows * cols` cells has been visited.

Return the coordinates `[r, c]` of the grid's cells, in the order you visit
them.

### Example 1

![diagram](figures/885-1.svg)

```text
Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0],[0,1],[0,2],[0,3]]
Explanation: The single row is the whole grid. The first east run records [0,1]; the walk then loops around outside the grid, and later southbound runs re-enter the row at [0,2] and [0,3].
```

### Example 2

![diagram](figures/885-2.svg)

```text
Input: rows = 5, cols = 6, rStart = 1, cStart = 4
Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]
Explanation: The first runs curl around the start, recording [1,5], [2,5], [2,4], [2,3], [1,3], [0,3], [0,4], [0,5]. Each later ring is larger, sweeping the remaining rows and columns, and the walk ends at [0,0] once all 30 cells are listed.
```

### Constraints

- `1 <= rows, cols <= 100`
- `0 <= rStart < rows`
- `0 <= cStart < cols`
