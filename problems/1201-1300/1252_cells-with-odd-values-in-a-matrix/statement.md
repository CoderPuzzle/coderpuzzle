# Cells with Odd Values in a Matrix

## Description

There is an `m x n` matrix that is initialized to all `0`'s. There is also a
2D array `indices` where each `indices[i] = [ri, ci]` represents a 0-indexed
location to perform some increment operations on the matrix.

For each location `indices[i]`, do both of the following:

- Increment all the cells on row `ri`.
- Increment all the cells on column `ci`.

Given `m`, `n`, and `indices`, return the number of odd-valued cells in the
matrix after applying the increment to all locations in `indices`.

### Example 1

![diagram](figures/1252-1.svg)

```text
Input: m = 2, n = 3, indices = [[0,1],[1,1]]
Output: 6
Explanation: Initial matrix = [[0,0,0],[0,0,0]]. After applying the first increment it becomes [[1,2,1],[0,1,0]]. The final matrix is [[1,3,1],[1,3,1]], which contains 6 odd numbers.
```

### Example 2

![diagram](figures/1252-2.svg)

```text
Input: m = 2, n = 2, indices = [[1,1],[0,0]]
Output: 0
Explanation: Final matrix = [[2,2],[2,2]]. There are no odd numbers in the final matrix.
```

### Constraints

- `1 <= m, n <= 50`
- `1 <= indices.length <= 100`
- `0 <= ri < m`
- `0 <= ci < n`

### Follow-up

Could you solve it in `O(n + m + indices.length)` time with only `O(n + m)`
extra space?

## Hints

### Hint 1

Simulation: with small constraints, it is possible to apply changes to each
row and column and count odd cells after applying them.

### Hint 2

You can accumulate the number you should add to each row and column and then
count the number of odd cells.
