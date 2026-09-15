# Solutions — Robot Bounded In Circle

## Single-pass displacement check

Simulate the instruction string exactly once from the origin facing north, tracking position `(x, y)` and heading `(dx, dy)`. `G` steps along the heading; `L` and `R` rotate the heading 90 degrees using the coordinate identities `(dx, dy) -> (-dy, dx)` and `(dx, dy) -> (dy, -dx)` — no trigonometry or direction labels required.

The verdict needs only the end state of that single pass. If the robot ends facing north and not at the origin, every repetition adds the same displacement vector in the same direction, so the walk drifts without bound — false. Otherwise it is true: ending at the origin makes each pass a closed loop trivially; and any other final heading means each repetition's displacement is the previous one rotated by a fixed 90 or 180 or 270 degrees, so within at most four repetitions the rotated copies cancel and the robot returns to the origin, cycling forever inside a bounded region.

The check `(x, y) == (0, 0) or (dx, dy) != (0, 1)` expresses that dichotomy directly — return to start, or any turn at all. Constant state and one sweep over the string is all the algorithm uses.

**Complexity:** `O(n)` time, `O(1)` space.
