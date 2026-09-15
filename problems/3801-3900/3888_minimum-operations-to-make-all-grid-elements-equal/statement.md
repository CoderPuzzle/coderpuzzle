# Minimum Operations to Make All Grid Elements Equal

## Description

You are given a 2D integer array `grid` of size `m × n`, and an integer `k`.

In one operation, you can:

- Select any `k x k` submatrix of `grid`, and
- Increment all elements inside that submatrix by 1.

Return the minimum number of operations required to make all elements in the
grid equal. If it is not possible, return `-1`.

A submatrix `(x1, y1, x2, y2)` is a matrix that forms by choosing all cells
`matrix[x][y]` where `x1 <= x <= x2` and `y1 <= y <= y2`.

### Example 1

```text
Input: grid = [[3,3,5],[3,3,5]], k = 2
Output: 2
Explanation:
    Choose the left 2 x 2 submatrix (covering the first two columns) and
    apply the operation twice.

        After 1 operation: [[4, 4, 5], [4, 4, 5]]
        After 2 operations: [[5, 5, 5], [5, 5, 5]]

    All elements become equal to 5. Thus, the minimum number of operations
    is 2.
```

### Example 2

```text
Input: grid = [[1,2],[2,3]], k = 1
Output: 4
Explanation:
    Since k = 1, each operation increments a single cell grid[i][j] by 1.
    To make all elements equal, the final value must be 3.

        Increase grid[0][0] = 1 to 3, requiring 2 operations.
        Increase grid[0][1] = 2 to 3, requiring 1 operation.
        Increase grid[1][0] = 2 to 3, requiring 1 operation.

    Thus, the minimum number of operations is 2 + 1 + 1 + 0 = 4.
```

### Constraints

- `1 <= m == grid.length <= 1000`
- `1 <= n == grid[i].length <= 1000`
- `-10⁵ <= grid[i][j] <= 10⁵`
- `1 <= k <= min(m, n)`

## Hints

### Hint 1

Determine a target value that can be reached using the operations.

### Hint 2

Use a 2D difference array to track how many chosen `k x k` operations
currently affect each cell.
