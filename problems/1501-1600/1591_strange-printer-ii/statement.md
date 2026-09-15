# Strange Printer II

## Description

A strange printer produces a grid of colors by a sequence of stamping
operations. On each turn it chooses an axis-aligned rectangle of the grid
and stamps it entirely with a single solid color, completely overwriting
whatever was in that rectangle before. Once a color has been used for a
stamp, that same color may never be stamped again — every color appears in
exactly one operation, though that one operation can cover as small or as
large a rectangle as needed.

You are given the finished `targetGrid`, where `targetGrid[row][col]` is
the color left at position `(row, col)`. Determine whether some sequence of
rectangle stamps could have produced this exact grid, and return `true` or
`false` accordingly.

### Example 1

![diagram](figures/1591-1.svg)

```text
Input: targetGrid = [[1,1,1,1],[1,2,2,1],[1,2,2,1],[1,1,1,1]]
Output: true
Explanation: Stamp color 1 across the whole 4x4 grid first, then stamp
color 2 over the inner 2x2 block. The later stamp fully covers what it
overwrites, leaving exactly this grid.
```

### Example 2

![diagram](figures/1591-2.svg)

```text
Input: targetGrid = [[1,1,1,1],[1,1,3,3],[1,1,3,4],[5,5,1,4]]
Output: true
Explanation: One valid order is 1, then 5, then 3, then 4: color 1 fills
the whole grid, 5 stamps its 1x2 strip in the bottom-left, 3 stamps its
small block, and 4 stamps its two cells last, each stamp landing only on
cells that still show its own final color afterward.
```

### Example 3

```text
Input: targetGrid = [[1,2,1],[2,1,2],[1,2,1]]
Output: false
Explanation: Color 1's cells and color 2's cells are interleaved throughout
the whole 3x3 area, so whichever of the two rectangles gets stamped first
would have to be stamped again afterward to restore its cells that the
other color's rectangle overwrites — but a color may only be used once.
```

### Constraints

- `m == targetGrid.length`
- `n == targetGrid[i].length`
- `1 <= m, n <= 60`
- `1 <= targetGrid[row][col] <= 60`

## Hints

### Hint 1

Think about the process in reverse. Given the finished grid, how could you
tell which color was stamped last?
