# Magic Squares In Grid

## Description

A `3 x 3` magic square is a `3 x 3` grid filled with distinct numbers from `1`
to `9` such that each row, column, and both diagonals all have the same sum.

Given a `row x col` grid of integers, return the number of `3 x 3` magic
square subgrids.

Note: while a magic square can only contain the numbers from `1` to `9`,
`grid` itself may contain numbers up to `15`.

### Example 1

![diagram](figures/840-1.svg)

![diagram](figures/840-2.svg)

![diagram](figures/840-3.svg)

```text
Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
Output: 1
Explanation: The subgrid spanning the first three columns,
[[4,3,8],[9,5,1],[2,7,6]], uses each of the numbers 1 through 9 exactly
once, and every row, column, and diagonal sums to 15, so it is a 3 x 3
magic square. The subgrid spanning the last three columns,
[[3,8,4],[5,1,9],[7,6,2]], has a main diagonal 3 + 1 + 2 = 6, so it is
not. In total, there is only one magic square inside the given grid.
```

### Example 2

```text
Input: grid = [[8]]
Output: 0
Explanation: A 1 x 1 grid contains no 3 x 3 subgrid at all.
```

### Constraints

- `row == grid.length`
- `col == grid[i].length`
- `1 <= row, col <= 10`
- `0 <= grid[i][j] <= 15`
