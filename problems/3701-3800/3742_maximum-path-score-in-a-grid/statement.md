# Maximum Path Score in a Grid

## Description

You are given an `m x n` `grid` in which every cell holds one of the values
`0`, `1`, or `2`, along with an integer `k`.

You start on the top-left cell `(0, 0)` and want to reach the bottom-right
cell `(m - 1, n - 1)`, moving only right or down.

Each cell you step on adds a score and charges a cost determined by its
value:

- `0`: adds `0` to your score and charges nothing.
- `1`: adds `1` to your score and charges `1`.
- `2`: adds `2` to your score and charges `1`.

Return the maximum total score a path can collect while keeping its total
cost at most `k`, or `-1` if no path stays within the budget. Arriving at the
last cell is not enough on its own: if the total cost of the path exceeds
`k`, that path does not count.

### Example 1

```text
Input: grid = [[0,1],[2,0]], k = 1
Output: 2
Explanation: Going down first and then right steps on cells (0, 0), (1, 0)
and (1, 1): scores 0 + 2 + 0 = 2 for costs 0 + 1 + 0 = 1, which fits the
budget exactly. Going right first would collect only 0 + 1 + 0 = 1.
```

### Example 2

```text
Input: grid = [[0,1],[1,2]], k = 1
Output: -1
Explanation: Both paths must cross two charged cells besides the free start,
so either arrival at (1, 1) pays a total cost of 2 and busts the budget.
```

### Constraints

- `1 <= m, n <= 200`
- `0 <= k <= 10³`
- `grid[0][0] == 0`
- `0 <= grid[i][j] <= 2`

## Hints

### Hint 1

Use dynamic programming.

### Hint 2

Let `dp[i][j][c]` be the maximum score collected on a path ending at cell
`(i, j)` whose total cost is exactly `c`, with `0 <= c <= k`.

### Hint 3

Fill `dp[i][j][c]` from `(i - 1, j)` and `(i, j - 1)`: stepping onto
`(i, j)` adds score `grid[i][j]` and cost `0` when `grid[i][j]` is `0`,
otherwise cost `1`.

### Hint 4

The answer is the maximum of `dp[m - 1][n - 1][c]` over `c = 0..k`, or `-1`
if every entry is unreachable.
