# Twisted Mirror Path Count

## Description

You are given an `m x n` binary matrix `grid`, where `grid[i][j] == 0` marks
an empty cell and `grid[i][j] == 1` marks a mirror.

A robot starts on the top-left cell `(0, 0)` and wants to reach the
bottom-right cell `(m - 1, n - 1)`. From any cell it stands on, it attempts
to move one cell right or one cell down. The robot never stands on a mirror:
an attempted step into a mirror cell is deflected before the robot enters it.

- Attempting to move right into a mirror turns the move downward and sends
  the robot into the cell directly below that mirror.
- Attempting to move down into a mirror turns the move rightward and sends
  the robot into the cell directly to the right of that mirror.

A deflection can cascade. If the deflected step would land on another mirror,
that mirror deflects the robot again according to the direction it was moving
when it entered — entering while moving right turns down, entering while
moving down turns right — and so on, until the robot lands on an empty cell,
or a deflected step would carry it outside the grid. A path whose deflection
leaves the grid is invalid and is not counted.

Return the number of unique valid paths from `(0, 0)` to `(m - 1, n - 1)`
modulo `10⁹ + 7`.

### Example 1

```text
Input: grid = [[0,1,0],[0,0,1],[1,0,0]]
Output: 5
Explanation: One of the five valid paths steps down from (1, 0) into the
mirror at (2, 0): that mirror turns the move right, dropping the robot on
(2, 1), which then walks to (2, 2).
```

### Example 2

```text
Input: grid = [[0,0],[0,0]]
Output: 2
Explanation: With no mirrors present this is the ordinary count — right
then down, or down then right.
```

### Example 3

```text
Input: grid = [[0,1,1],[1,1,0]]
Output: 1
Explanation: Moving right first bounces off (0, 1), off (1, 1), and lands
on (1, 2) — a valid path. Moving down first bounces off (1, 0) onto (1, 1)
and then out of bounds, so that path does not count.
```

### Constraints

- `2 <= m, n <= 500`
- `m == grid.length`
- `n == grid[i].length`
- `grid[i][j]` is either `0` or `1`.
- `grid[0][0] == grid[m - 1][n - 1] == 0`

## Hints

### Hint 1

Precompute, for every cell and each attempted move (right or down), where
the robot actually lands once mirrors have deflected the step — resolve each
jump once and store its target.

### Hint 2

Let `dp[i][j]` be the number of ways to reach `(i, j)`. Set `dp[0][0] = 1`,
sweep cells in row-major order, and for each nonzero `dp[i][j]` add it into
the dp value of both precomputed landing cells.

### Hint 3

Take every addition modulo `10⁹ + 7`, and skip any landing cell that falls
outside the grid.
