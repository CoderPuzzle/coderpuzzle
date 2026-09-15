# Number of Corner Rectangles

## Description

You are given an `m x n` matrix `grid` where each entry is only `0` or `1`.
Return the number of corner rectangles.

A corner rectangle is four distinct `1`'s on the grid that form an
axis-aligned rectangle. Note that only the corners need to have the value
`1` — the cells in between, edges and interior alike, may hold anything,
and the interior is not required to be empty. Also, all four `1`'s used
must be distinct.

### Example 1

![diagram](figures/750-1.svg)

```text
Input: grid = [[1,0,0,1,0],[0,0,1,0,1],[0,0,0,1,0],[1,0,1,0,1]]
Output: 1
Explanation: There is only one corner rectangle, with corners grid[1][2],
grid[1][4], grid[3][2], and grid[3][4].
```

### Example 2

![diagram](figures/750-2.svg)

```text
Input: grid = [[1,1,1],[1,1,1],[1,1,1]]
Output: 9
Explanation: There are four 2x2 rectangles, four 2x3 and 3x2 rectangles,
and one 3x3 rectangle.
```

### Example 3

![diagram](figures/750-3.svg)

```text
Input: grid = [[1,1,1,1]]
Output: 0
Explanation: Rectangles must have four distinct corners.
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `grid[i][j]` is either `0` or `1`.
- The number of `1`'s in the grid is in the range `[1, 6000]`.

## Hints

### Hint 1

For each pair of `1`'s in the current row (say at columns `i` and `j`),
that pair can act as the base of new rectangles: one for every earlier row
that also had `1`'s at both column `i` and column `j`.
