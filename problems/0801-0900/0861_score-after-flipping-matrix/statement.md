# Score After Flipping Matrix

## Description

You are given an `m x n` binary matrix `grid`. A move consists of choosing
any row or any column and toggling each value in that row or column — every
`0` becomes `1` and every `1` becomes `0`. You may make any number of moves,
including zero.

Each row is interpreted as a binary number with the leftmost cell as the
most significant bit, and the score of the matrix is the sum of these `m`
numbers.

Return the highest possible score you can achieve.

### Example 1

![diagram](figures/861-1.svg)

```text
Input: grid = [[0,0,1,1],[1,0,1,0],[1,1,0,0]]
Output: 39
Explanation: Toggle the first row, then the last two columns. The rows read
0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39.
```

### Example 2

```text
Input: grid = [[0]]
Output: 1
Explanation: Toggling the only row (equivalently, the only column) turns
[0] into [1], whose value is 1.
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 20`
- `grid[i][j]` is either `0` or `1`.
