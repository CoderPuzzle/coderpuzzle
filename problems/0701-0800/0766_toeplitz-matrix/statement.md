# Toeplitz Matrix

## Description

Given an `m x n` matrix, return `true` if the matrix is Toeplitz. Otherwise,
return `false`.

A matrix is Toeplitz if every diagonal from top-left to bottom-right has the
same elements.

### Example 1

![diagram](figures/766-1.svg)

```text
Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
Output: true
Explanation: The diagonals are "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]",
"[3, 3]", "[4]". In each diagonal all elements are the same, so the answer
is true.
```

### Example 2

![diagram](figures/766-2.svg)

```text
Input: matrix = [[1,2],[2,2]]
Output: false
Explanation: The diagonal "[1, 2]" has different elements.
```

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 20`
- `0 <= matrix[i][j] <= 99`

### Follow-up

What if the matrix is stored on disk, and the memory is limited such that you
can only load at most one row of the matrix into memory at once?

What if the matrix is so large that you can only load up a partial row into
memory at once?

## Hints

### Hint 1

Check whether each value is equal to the value of its top-left neighbor.
