# Range Sum Query 2D - Mutable

## Description

Given a 2D `matrix`, handle multiple queries of the following types:

1. Update the value of a cell in `matrix`.
2. Calculate the sum of the elements of `matrix` inside the rectangle defined
   by its upper left corner `(row1, col1)` and lower right corner
   `(row2, col2)`.

Implement the `NumMatrix` class:

- `NumMatrix(int[][] matrix)` Initializes the object with the integer matrix
  `matrix`.
- `void update(int row, int col, int val)` Updates the value of
  `matrix[row][col]` to be `val`.
- `int sumRegion(int row1, int col1, int row2, int col2)` Returns the sum of
  the elements of `matrix` inside the rectangle defined by its upper left
  corner `(row1, col1)` and lower right corner `(row2, col2)` **inclusive**.

### Example 1

```text
Input:
["NumMatrix", "sumRegion", "update", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [3, 2, 2], [2, 1, 4, 3]]
Output: [null, 8, null, 10]
Explanation:
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // returns 8 (sum of the left red rectangle)
numMatrix.update(3, 2, 2);       // matrix[3][2] changes from 0 to 2
numMatrix.sumRegion(2, 1, 4, 3); // returns 10 (sum of the right red rectangle)
```

![Two copies of the matrix with the queried rectangle outlined; update(3, 2, 2) changes matrix[3][2] and the same query grows from 8 to 10](figures/example-1.svg)

### Example 2

```text
Input:
["NumMatrix", "update", "sumRegion", "sumRegion", "update", "sumRegion"]
[[[[-1000, 1000], [0, 0]]], [0, 0, 1000], [0, 0, 1, 1], [0, 1, 0, 1], [1, 1, -1000], [0, 0, 1, 1]]
Output: [null, null, 2000, 1000, null, 1000]
Explanation:
NumMatrix numMatrix = new NumMatrix([[-1000, 1000], [0, 0]]);
numMatrix.update(0, 0, 1000);   // matrix = [[1000, 1000], [0, 0]]
numMatrix.sumRegion(0, 0, 1, 1); // returns 1000 + 1000 + 0 + 0 = 2000
numMatrix.sumRegion(0, 1, 0, 1); // returns 1000
numMatrix.update(1, 1, -1000);  // matrix = [[1000, 1000], [0, -1000]]
numMatrix.sumRegion(0, 0, 1, 1); // returns 1000 + 1000 + 0 - 1000 = 1000
```

### Constraints

- `m == matrix.length`, `n == matrix[i].length`
- `1 <= m, n <= 200`
- `-1000 <= matrix[i][j] <= 1000`
- `0 <= row < m` and `0 <= col < n`
- `-1000 <= val <= 1000`
- `0 <= row1 <= row2 < m` and `0 <= col1 <= col2 < n`
- At most `5000` calls will be made to `update` and `sumRegion`.

### Follow-up

Could you implement both `update` and `sumRegion` in `O(log m · log n)` time,
where `m` and `n` are the matrix dimensions?

## Hints

### Hint 1

A 2D prefix-sum table answers rectangle sums in `O(1)`, but one cell update
forces an `O(m · n)` rebuild. Reach for the same idea that fixes the 1D
version: a structure of overlapping **partial rectangle sums** that both a
query and a point update only need to touch a few of.

### Hint 2

A 2D Fenwick tree (binary indexed tree) nests one BIT per row inside another
BIT over the rows: the cell at `(i, j)` stores the sum of the rectangle whose
height is `i & (-i)` rows and whose width is `j & (-j)` columns, ending at
`(i, j)`. Strip off the low bit in one index, then the other, to walk disjoint
rectangles that tile any top-left-anchored region.

### Hint 3

Anchor everything at the top-left corner: `sumRegion(r1, c1, r2, c2)` is
`prefix(r2 + 1, c2 + 1) - prefix(r1, c2 + 1) - prefix(r2 + 1, c1) +
prefix(r1, c1)`, where `prefix(r, c)` sums rows `0..r-1` and columns `0..c-1`.
For an update, propagate only the **delta** `val - matrix[row][col]` (and
remember the new value so the next delta is correct).
