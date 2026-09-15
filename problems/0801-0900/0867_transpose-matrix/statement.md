# Transpose Matrix

## Description

You are given an `m x n` matrix of integers `matrix`, where `matrix[i][j]` is
the entry at row `i`, column `j`. Your task is to return the transpose of
`matrix`.

The transpose is the matrix flipped over its main diagonal, swapping the row
and column indices of every entry: the value at row `i`, column `j` of the
input appears at row `j`, column `i` of the transpose. Equivalently, row `i`
of the input becomes column `i` of the result — so an `m x n` input yields an
`n x m` output.

![diagram](figures/867-1.svg)

### Example 1

```text
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]
Explanation: Row [1,2,3] becomes the first column, row [4,5,6] the second, and row [7,8,9] the third; the square shape is preserved.
```

### Example 2

```text
Input: matrix = [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]
Explanation: The input is 2 x 3, so the transpose is 3 x 2 — each input row becomes an output column, and the shape changes.
```

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 1000`
- `1 <= m * n <= 10⁵`
- `-10⁹ <= matrix[i][j] <= 10⁹`

## Hints

### Hint 1

No clever algorithm is needed here — only a clear picture of what the
transpose looks like. Rows become columns and vice versa: write the entry at
row `i`, column `j` into row `j`, column `i` of a fresh `n x m` grid.
