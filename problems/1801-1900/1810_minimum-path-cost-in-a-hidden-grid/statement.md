# Minimum Path Cost in a Hidden Grid

## Description

This is an **interactive** problem.

A robot sits in a hidden grid, and you must move it from its starting cell to
the target cell. The grid is of size `m x n`; each cell is either empty or
blocked. The starting cell and the target cell are different, and neither is
blocked.

Every cell has a cost that you pay **each time you move onto the cell**. The
starting cell's cost is not applied before the robot moves.

Find the **minimum total cost** to move the robot to the target cell. You do
not know the grid's dimensions, the start, or the target — you may only ask
queries of the `GridMaster` object:

- `canMove(direction)` — returns `true` if the robot can move in that
  direction, `false` otherwise.
- `move(direction)` — moves the robot in that direction and returns the cost
  of moving to that cell. If the move would enter a blocked cell or leave the
  grid, it is ignored (the robot stays put) and `-1` is returned.
- `isTarget()` — returns `true` if the robot is currently on the target cell.

`direction` is one of `'U'`, `'D'`, `'L'`, `'R'` (up, down, left, right).

Return the minimum total cost to get the robot from its starting cell to the
target cell, or `-1` if no valid path exists.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
`GridMaster` object is passed to your method by the judge; its query budget is
1 000 000 calls — far more than exploration needs, but a solution that loops
without direction will be cut off.

### Example 1

```text
Input: grid = [[2,3],[1,1]], start = [0,1], target = [1,0]
Output: 2
Explanation: The robot starts on the 3. Moving left costs 2 and reaches the
cell above the target; moving down costs 1 and reaches the target. Total: 2.
(The grid, start, and target are hidden from your code — the judge only
answers canMove/move/isTarget queries.)
```

### Example 2

```text
Input: grid = [[0,3,1],[3,4,2],[1,2,0]], start = [2,0], target = [0,2]
Output: 9
Explanation: The minimum cost path is (2,0) -> (2,1) -> (1,1) -> (1,2) -> (0,2),
paying 2 + 4 + 2 + 1 = 9.
```

### Constraints

- `1 <= m, n <= 100`
- `grid[i][j] == 0` means cell `(i, j)` is blocked; `grid[i][j] >= 1` means it
  is empty and `grid[i][j]` is the cost of moving onto it.
- `1 <= grid[i][j] <= 100` for empty cells.
- The start and target cells are different and not blocked.
- At most `1 000 000` oracle queries.

## Hints

### Hint 1

You can learn the whole reachable grid: walk with `move`, remember the cost
each step reports, and use `canMove` to detect walls without losing your place.

### Hint 2

Explore with DFS, undoing every step (move back the way you came) so the
robot returns to where it started — the map you build is relative to the
start, which is all you need.

### Hint 3

Once every reachable cell and edge cost is known, the answer is a plain
shortest-path computation (Dijkstra) from the start to the cell where
`isTarget()` reported true.
