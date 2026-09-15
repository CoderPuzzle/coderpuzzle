# Spiral Matrix

## Description

Given an `m x n` matrix, return all elements of the matrix in spiral order.

### Example 1

![diagram](figures/54-1.svg)

```text
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
Explanation: The traversal winds clockwise from the top-left corner: right along the first row, down the last column, left along the last row, up the first column, then inward to repeat.
```

### Example 2

![diagram](figures/54-2.svg)

```text
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

## Hints

### Hint 1

The best approach for this problem is simulation: walk the matrix the way the spiral does instead of computing each position by formula.

### Hint 2

Go boundary by boundary, moving inwards: first row, last column, last row, first column — then step every boundary inward by one and repeat.

### Hint 3

Before walking the last two sides of a ring, check whether a single row or column is all that remains, so no cell is emitted twice.
