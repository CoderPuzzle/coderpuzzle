# Matrix Cells in Distance Order

## Description

You are given four integers row, cols, rCenter, and cCenter. There is a
rows x cols matrix and you are on the cell with the coordinates
(rCenter, cCenter).

Return the coordinates of all cells in the matrix, sorted by their
distance from (rCenter, cCenter) from the smallest distance to the
largest distance.

For a deterministic answer, this judge pins the choice the problem
otherwise leaves open: cells at the same distance are ordered by
ascending row index, then by ascending column index. Both examples below
are reproduced by exactly this rule.

The distance between two cells (r1, c1) and (r2, c2) is
`|r1 - r2| + |c1 - c2|`.

### Example 1

```text
Input: rows = 1, cols = 2, rCenter = 0, cCenter = 0
Output: [[0,0],[0,1]]
Explanation: The distances from (0, 0) to other cells are: [0,1]
```

### Example 2

```text
Input: rows = 2, cols = 2, rCenter = 0, cCenter = 1
Output: [[0,1],[0,0],[1,1],[1,0]]
Explanation: The distances from (0, 1) to other cells are: [0,1,1,2]
```

### Example 3

```text
Input: rows = 2, cols = 3, rCenter = 1, cCenter = 2
Output: [[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
Explanation: The distances from (1, 2) to other cells are: [0,1,1,2,2,3]
```

### Constraints

- `1 <= rows, cols <= 100`
- `0 <= rCenter < rows`
- `0 <= cCenter < cols`
