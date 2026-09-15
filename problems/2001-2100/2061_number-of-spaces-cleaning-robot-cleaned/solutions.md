# Solutions — Number of Spaces Cleaning Robot Cleaned

## Simulate directional states

Track the robot's row, column, and direction, starting at `(0, 0)` facing right. Mark each room cell when it is first cleaned; if the square ahead is outside the room or blocked, rotate clockwise in place, otherwise advance into that square.

The simulation stops when the complete `(row, column, direction)` state repeats, because every later move would repeat the same deterministic cycle. A cell alone is not enough for termination since the robot may revisit it from another direction and then follow a different transition.

**Complexity:** `O(mn)` time and `O(mn)` space.
