# Special Positions in a Binary Matrix

## Description

Given an `m x n` binary matrix `mat`, return the number of special
positions in `mat`.

A position `(i, j)` is called special if `mat[i][j] == 1` and all other
elements in row `i` and column `j` are `0` (rows and columns are
0-indexed).

### Example 1

![diagram](figures/1582-1.svg)

```text
Input: mat = [[1,0,0],[0,0,1],[1,0,0]]
Output: 1
Explanation: (1, 2) is a special position because mat[1][2] == 1 and all
other elements in row 1 and column 2 are 0.
```

### Example 2

![diagram](figures/1582-2.svg)

```text
Input: mat = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: (0, 0), (1, 1) and (2, 2) are special positions.
```

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 100`
- `mat[i][j]` is either `0` or `1`.

## Hints

### Hint 1

Keep track of the count of 1s in each row and in each column. Then, while
iterating over the matrix, a position holds a 1 that is special exactly
when its row count and its column count are both 1.
