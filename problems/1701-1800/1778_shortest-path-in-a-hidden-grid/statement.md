# Shortest Path in a Hidden Grid

## Description

This is an **interactive** problem.

A robot sits in a hidden grid, and you must find how far it is from its
starting cell to the target cell. The grid is of size `m x n`; each cell is
either empty or blocked. The starting cell and the target cell are different,
and neither is blocked.

Find the **minimum number of moves** needed to bring the robot from its
starting cell to the target cell, where every move shifts the robot one cell
up, down, left, or right onto an empty cell. You do not know the grid's
dimensions, the start, or the target — you may only ask queries of the
`GridMaster` object:

- `canMove(direction)` — returns `true` if the robot can move in that
  direction, `false` otherwise.
- `move(direction)` — moves the robot in that direction. If the move would
  enter a blocked cell or leave the grid, it is ignored and the robot stays
  put. (The judge's oracle also returns the cost of the cell entered, which
  is always `1` here and can be ignored.)
- `isTarget()` — returns `true` if the robot is currently on the target cell.

`direction` is one of `'U'`, `'D'`, `'L'`, `'R'` (up, down, left, right).

Return the minimum number of moves from the starting cell to the target
cell, or `-1` if no valid path exists.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
`GridMaster` object is passed to your method by the judge; its query budget
is 4 000 000 calls — far more than exploration needs, but a solution that
loops without direction will be cut off.

### Example 1

```text
Input: grid = [[1, 1], [1, 0]], start = [1, 0], target = [0, 1]
Output: 2
Explanation: The robot starts on the empty cell at (1, 0); the cell below it
is blocked. Moving up reaches (0, 0) and moving right reaches (0, 1), the
target — two moves in total. (The grid, start, and target are hidden from
your code — the judge only answers canMove/move/isTarget queries.)
```

### Example 2

```text
Input: grid = [[0, 0, 1], [1, 1, 1], [1, 0, 0]], start = [0, 2], target = [2, 0]
Output: 4
Explanation: The minimum path is (0, 2) -> (1, 2) -> (1, 1) -> (1, 0) ->
(2, 0): four moves.
```

### Example 3

```text
Input: grid = [[1, 0], [0, 1]], start = [0, 0], target = [1, 1]
Output: -1
Explanation: Both cells adjacent to the start are blocked, so the target
cannot be reached.
```

### Constraints

- `1 <= m, n <= 500`
- `grid[i][j] == 0` means cell `(i, j)` is blocked; `grid[i][j] == 1` means it
  is empty.
- The start and target cells are different and not blocked.
- At most `4 000 000` oracle queries.

## Hints

### Hint 1

You can learn the whole reachable grid without ever getting lost: use
`canMove` to test a direction, `move` to take it, and remember what you
learned — the coordinates you record only need to be relative to the start.

### Hint 2

Explore with DFS, undoing every step (move back the way you came) so the
robot physically returns along the DFS tree. While exploring, call
`isTarget()` once per newly entered cell to learn where the target is.

### Hint 3

Once every reachable cell is known, the answer is a plain breadth-first
search from the start over the discovered cells — every edge has length 1,
so the first time BFS reaches the target's cell, the distance is final. If
exploration never saw the target, no path exists.
