# Robot Bounded In Circle

## Description

On an infinite plane, a robot initially stands at `(0, 0)` and faces north. Note that:

- The north direction is the positive direction of the y-axis.
- The south direction is the negative direction of the y-axis.
- The east direction is the positive direction of the x-axis.
- The west direction is the negative direction of the x-axis.

The robot can receive one of three instructions:

- `"G"`: go straight 1 unit.
- `"L"`: turn 90 degrees to the left (i.e., anti-clockwise direction).
- `"R"`: turn 90 degrees to the right (i.e., clockwise direction).

The robot performs the instructions given in order, and repeats them forever.

Return `true` if and only if there exists a circle in the plane such that the
robot never leaves the circle.

### Example 1

```text
Input: instructions = "GGLLGG"
Output: true
Explanation: The robot is initially at (0, 0) facing the north direction.
"G": move one step. Position: (0, 1). Direction: North.
"G": move one step. Position: (0, 2). Direction: North.
"L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: West.
"L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: South.
"G": move one step. Position: (0, 1). Direction: South.
"G": move one step. Position: (0, 0). Direction: South.
Repeating the instructions, the robot goes into the cycle: (0, 0) --> (0, 1) --> (0, 2) --> (0, 1) --> (0, 0).
Based on that, we return true.
```

### Example 2

```text
Input: instructions = "GG"
Output: false
Explanation: The robot moves from (0, 0) to (0, 2), always facing north.
Repeating the instructions, it keeps advancing north and never cycles.
```

### Example 3

```text
Input: instructions = "GL"
Output: true
Explanation: The robot goes (0, 0) --> (0, 1) --> (-1, 1) --> (-1, 0) --> (0, 0), ending where it started.
Repeating the instructions, the robot stays in the cycle: (0, 0) --> (0, 1) --> (-1, 1) --> (-1, 0) --> (0, 0).
Based on that, we return true.
```

### Constraints

- `1 <= instructions.length <= 100`
- `instructions[i]` is `'G'`, `'L'`, or `'R'`.

## Hints

### Hint 1

Calculate the final vector of how the robot travels after executing all instructions once — it consists of a change in position plus a change in direction.

### Hint 2

The robot stays in a circle if and only if (looking at that final vector) it changed direction (i.e., does not stay pointing north), or it ends up back where it started.
