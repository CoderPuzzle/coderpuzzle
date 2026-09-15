# Solutions — Dungeon Game

## Backward Dynamic Programming

A forward greedy or a forward "maximize health" DP fails because a large magic orb deep in the dungeon can justify suffering through demons earlier — what matters at each room is not current health but the minimum health required on entry. The solution therefore works backwards from the princess's room, computing `need[i][j]`: the smallest health the knight must have when _entering_ cell `(i, j)` so that some right/down path from there survives to the end.

The recurrence is `need[i][j] = max(1, min(need[i+1][j], need[i][j+1]) - dungeon[i][j])`. The knight picks the cheaper of the two onward rooms, pays this room's effect, and the outer `max(1, ...)` enforces the rule that health must never drop to 0 or below — even a room that would leave the knight at exactly 0 health is fatal. The grid is padded with an `INF` border so out-of-bounds neighbors are never chosen, except for one seed: `need[m][n-1]` is set to 1, so that _leaving_ the bottom-right princess room requires at least 1 health, which makes the last room's own value come out as `max(1, 1 - dungeon[m-1][n-1])`.

![The need table for the example dungeon: each cell shows its room value and, in blue, the health needed on entry; the answer need[0][0] is 7.](figures/solution-need-table.svg)

The loops fill rows from bottom to top and each row right to left, so both onward values are already final when a cell is computed; the answer is `need[0][0]`. A single-cell dungeon like `[[0]]` correctly yields 1, and `[[5]]` yields 1 as well since initial health only needs to be positive.

**Complexity:** `O(mn)` time, `O(mn)` space.
