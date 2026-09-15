# Unique Paths

## Description

There is a robot on an `m x n` grid. The robot is initially located at the
**top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the
**bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move
either down or right at any point in time.

Given the two integers `m` and `n`, return _the number of possible unique
paths that the robot can take to reach the bottom-right corner_.

The test cases are generated so that the answer will be less than or equal to
`2 * 10^9`.

### Example 1

```text
Input: m = 3, n = 7
Output: 28
```

![A 3 by 7 grid with Start in the top-left and Finish in the bottom-right corner.](figures/example-1.svg)

### Example 2

```text
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

### Constraints

- `1 <= m, n <= 100`

## Hints

### Hint 1

Dynamic programming: the number of paths to a cell is the sum of the paths to the cell above and the cell to the left.

### Hint 2

The first row and first column each have exactly one path (all rights or all downs).

### Hint 3

A single rolling 1-D row of size n is enough to compute the table row by row.

### Hint 4

Alternatively the answer is the binomial coefficient C(m + n - 2, m - 1).
