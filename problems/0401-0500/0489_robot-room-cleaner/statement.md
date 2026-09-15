# Robot Room Cleaner

## Description

This is an **interactive** problem.

You control a robot located somewhere in a hidden room. The room is modeled
as an `m x n` binary grid where `0` represents an obstacle and `1` an empty
cell. The robot starts on an empty cell, facing **up**. You do not have
access to the grid — you may only drive the robot through the `Robot` object
the judge hands to your method:

- `move()` — returns `true` if the cell in front is open, and the robot
  moves into it. Returns `false` if the cell in front is an obstacle or
  outside the room; the robot stays where it is.
- `turnLeft()` — rotates the robot 90 degrees counter-clockwise in place.
- `turnRight()` — rotates the robot 90 degrees clockwise in place.
- `clean()` — cleans the cell the robot currently stands on.

Design an algorithm that cleans **every empty cell reachable from the
start**. `cleanRoom` returns nothing; the judge compares the exact set of
cells the robot cleaned against the set of reachable cells, so any complete
strategy passes and any missed cell fails.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
robot starts facing up, and the oracle's operation budget is 200 000 calls
(`move`, `turnLeft`, `turnRight`, `clean` each spend one) — generous for a
systematic exploration, but a solution that wanders without direction will
be cut off.

### Example 1

```text
Input: room = [[1,1,1,1,1,0,1,1],[1,1,1,1,1,0,1,1],[1,0,1,1,1,1,1,1],[0,0,0,1,0,0,0,0],[1,1,1,1,1,1,1,1]], row = 1, col = 3
Output: Robot cleaned all rooms.
Explanation: 0 marks a blocked cell, 1 an accessible one. The robot starts
at row 1, column 3 (the room layout and start are hidden from your code —
the judge only answers move/turn/clean calls). A spiral DFS that backtracks
out of every dead end reaches all 30 accessible cells, so the cleaned set
equals the reachable set.
```

### Example 2

```text
Input: room = [[1]], row = 0, col = 0
Output: Robot cleaned all rooms.
Explanation: The single cell is the start; cleaning it finishes the room.
```

### Constraints

- `1 <= m <= 100`, `1 <= n <= 200`.
- `room[i][j]` is either `0` or `1`.
- `0 <= row < m`, `0 <= col < n`, and `room[row][col] == 1`.
- Every empty cell is reachable from the starting position.
- At most 200 000 robot operations.

## Hints

### Hint 1

The robot has no position sensor, but you can maintain your own coordinates:
track the cell it stands on relative to the start (`(0, 0)`) and update it
for every successful `move()`, remembering which of the four directions it
currently faces.

### Hint 2

Explore like a spiral DFS: from each cell, try the four directions in order
(turning right between attempts), and whenever `move()` succeeds, recurse
from the new cell — keeping a `visited` set so no cell is entered twice.

### Hint 3

After a recursive call returns, the robot is one step away from where the
search continues. Back it out with the discipline _turn right twice, move,
turn right twice_: it retraces the step and restores the original facing, so
the parent frame can continue with its next direction.
