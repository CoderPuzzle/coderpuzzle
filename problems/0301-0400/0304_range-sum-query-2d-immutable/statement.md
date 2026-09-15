# Range Sum Query 2D - Immutable

## Description

Given a 2D `matrix`, handle multiple queries of the following type:

1. Calculate the sum of the elements of `matrix` inside the rectangle defined
   by its upper left corner `(row1, col1)` and lower right corner
   `(row2, col2)`.

The matrix never changes after construction, so preprocessing it once is fair
game.

Implement the `NumMatrix` class:

- `NumMatrix(int[][] matrix)` Initializes the object with the integer matrix
  `matrix`.
- `int sumRegion(int row1, int col1, int row2, int col2)` Returns the sum of
  the elements of `matrix` inside the rectangle defined by its upper left
  corner `(row1, col1)` and lower right corner `(row2, col2)` **inclusive**.

### Example 1

```text
Input:
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output: [null, 8, 11, 12]
Explanation:
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // returns 8 (sum of the left red rectangle)
numMatrix.sumRegion(1, 1, 2, 2); // returns 11 (sum of the green rectangle)
numMatrix.sumRegion(1, 2, 2, 4); // returns 12 (sum of the blue rectangle)
```

### Example 2

```text
Input:
["NumMatrix", "sumRegion", "sumRegion", "sumRegion", "sumRegion"]
[[[[-10000, 10000], [0, 0]]], [0, 0, 1, 1], [0, 0, 0, 0], [0, 1, 1, 1], [1, 0, 1, 1]]
Output: [null, 0, -10000, 10000, 0]
Explanation:
NumMatrix numMatrix = new NumMatrix([[-10000, 10000], [0, 0]]);
numMatrix.sumRegion(0, 0, 1, 1); // returns -10000 + 10000 + 0 + 0 = 0
numMatrix.sumRegion(0, 0, 0, 0); // returns -10000
numMatrix.sumRegion(0, 1, 1, 1); // returns 10000 + 0 = 10000
numMatrix.sumRegion(1, 0, 1, 1); // returns 0
```

### Constraints

- `m == matrix.length`, `n == matrix[i].length`
- `1 <= m, n <= 200`
- `-10⁴ <= matrix[i][j] <= 10⁴`
- `0 <= row1 <= row2 < m` and `0 <= col1 <= col2 < n`
- At most `10⁴` calls will be made to `sumRegion`.

### Follow-up

Could you preprocess `matrix` in `O(m · n)` time so that every `sumRegion`
call is answered in `O(1)` time?

## Hints

### Hint 1

Summing a rectangle cell by cell costs `O(m · n)` per query. Since the matrix
never changes, precompute a table of **top-left-anchored rectangle sums** once,
so each query combines a few already-known numbers.

### Hint 2

Let `prefix[r][c]` be the sum of all elements in rows `0..r-1` and columns
`0..c-1`, with an extra zero row and column around the table. Each entry
extends its neighbors by inclusion–exclusion:
`prefix[r][c] = matrix[r-1][c-1] + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1]`.

### Hint 3

Any query rectangle is the difference of four top-left-anchored rectangles:
`sumRegion(r1, c1, r2, c2) = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]`.
The strips above and to the left of the query cancel, leaving exactly the
requested rectangle.
