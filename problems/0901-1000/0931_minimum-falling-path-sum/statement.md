# Minimum Falling Path Sum

## Description

You are given an `n x n` matrix of integers, `matrix`. Return the minimum
sum of any falling path through `matrix`.

A falling path starts at any element in the first row and takes exactly one
element from every row below it. Each step moves straight down or
diagonally down-left / down-right: the element chosen after position
`(row, col)` is one of `(row + 1, col - 1)`, `(row + 1, col)`, or
`(row + 1, col + 1)`, so the column shifts by at most one per row and the
path always ends in the last row.

### Example 1

![diagram](figures/931-1.svg)

```text
Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
Explanation: Two falling paths share the minimum sum. The path [1,4,8]
starts at the top-middle element and steps down-right, then down-left; the
path [1,5,7] steps straight down, then down-left. Both sum to 13.
```

### Example 2

![diagram](figures/931-2.svg)

```text
Input: matrix = [[-19,57],[-40,-5]]
Output: -59
Explanation: The minimum path is [-19,-40], dropping straight down the
first column; -19 and -40 sum to -59.
```

### Constraints

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 100`
- `-100 <= matrix[i][j] <= 100`
