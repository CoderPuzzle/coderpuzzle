# Walking Robot Simulation

## Description

A robot on an infinite XY-plane starts at point (0, 0) facing north. The robot
receives an array of integers `commands`, which represents a sequence of moves
that it needs to execute. There are only three possible types of instructions
the robot can receive:

- `-2`: Turn left 90 degrees.
- `-1`: Turn right 90 degrees.
- `1 <= k <= 9`: Move forward `k` units, one unit at a time.

Some of the grid squares are obstacles. The `i`-th obstacle is at grid point
`obstacles[i] = (xᵢ, yᵢ)`. If the robot runs into an obstacle, it will stay at
its current location, on the block adjacent to the obstacle, and move on to
the next command.

Return the maximum squared Euclidean distance that the robot reaches at any
point in its path (i.e. if the distance is 5, return 25).

North means the +Y direction, east the +X direction, south the -Y direction,
and west the -X direction. There can be an obstacle at (0, 0): the robot
starts there regardless, but it is then unable to return to (0, 0).

### Example 1

```text
Input: commands = [4,-1,3], obstacles = []
Output: 25
Explanation: The robot moves north 4 units to (0, 4), turns right, and moves
east 3 units to (3, 4). The furthest point it ever reaches is (3, 4), which is
3² + 4² = 25 squared units away from the origin.
```

### Example 2

```text
Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
Output: 65
Explanation: The robot moves north 4 units to (0, 4) and turns right. It moves
east 1 unit and is blocked by the obstacle at (2, 4), so it stays at (1, 4),
turns left, and moves north 4 units to (1, 8). The furthest point it ever
reaches is (1, 8), which is 1² + 8² = 65 squared units away from the origin.
```

### Example 3

```text
Input: commands = [6,-1,-1,6], obstacles = [[0,0]]
Output: 36
Explanation: The robot moves north 6 units to (0, 6) and turns right twice.
Moving south, it advances 5 units, is blocked from entering the obstacle cell
(0, 0), and stops at (0, 1). The furthest point it ever reaches is (0, 6),
which is 6² = 36 squared units away from the origin.
```

### Constraints

- `1 <= commands.length <= 10⁴`
- `commands[i]` is either -2, -1, or an integer in the range [1, 9].
- `0 <= obstacles.length <= 10⁴`
- `-3 * 10⁴ <= xᵢ, yᵢ <= 3 * 10⁴`
- The answer is guaranteed to be less than 2³¹.
