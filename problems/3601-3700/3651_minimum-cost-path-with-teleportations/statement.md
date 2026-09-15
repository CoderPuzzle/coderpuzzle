# Minimum Cost Path with Teleportations

## Description

You are given an `m x n` integer matrix `grid` and an integer `k`. You start
on the top-left cell `(0, 0)` and want to reach the bottom-right cell
`(m - 1, n - 1)`.

From your current cell two kinds of moves are available:

- A **normal move** takes you one cell right, to `(i, j + 1)`, or one cell
  down, to `(i + 1, j)`, and costs the value of the destination cell.
- A **teleportation** takes you from your current cell `(i, j)` to any cell
  `(x, y)` whose value satisfies `grid[x][y] <= grid[i][j]`, and costs
  nothing. You may teleport at most `k` times.

Return the minimum total cost to reach `(m - 1, n - 1)` starting from
`(0, 0)`.

### Example 1

```text
Input: grid = [[1,3,3],[2,5,4],[4,3,5]], k = 2
Output: 7
Explanation: Move down onto (1, 0) for 2 and right onto (1, 1) for 5,
then teleport to (2, 2) — its value 5 satisfies 5 <= 5 — at no extra
cost. The total is 7.
```

### Example 2

```text
Input: grid = [[1,2],[2,3],[3,4]], k = 1
Output: 9
Explanation: No teleport beats walking here, so the cheapest route is
the plain walk down, right, down paying 2 + 3 + 4 = 9.
```

### Constraints

- `2 <= m, n <= 80`
- `m == grid.length`
- `n == grid[i].length`
- `0 <= grid[i][j] <= 10⁴`
- `0 <= k <= 10`

## Hints

### Hint 1

Use dynamic programming to solve the problem efficiently.

### Hint 2

Think of the solution in terms of up to `k` teleportation steps. At each
step, compute the minimum cost to reach each cell, either through a normal
move or through a teleportation from the previous step.
