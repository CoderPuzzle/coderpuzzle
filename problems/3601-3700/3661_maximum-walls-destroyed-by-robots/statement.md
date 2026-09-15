# Maximum Walls Destroyed by Robots

## Description

An endless straight line carries a scattering of robots and walls. You are
given integer arrays `robots`, `distance`, and `walls`:

- `robots[i]` is the position of the `i`-th robot.
- `distance[i]` is how far, in meters, the `i`-th robot's bullet can fly.
- `walls[j]` is the position of the `j`-th wall.

Every robot owns exactly one bullet and chooses whether to fire it left or
right. Flying straight, the bullet destroys every wall it passes that lies
within `distance[i]` meters of its shooter. Robots themselves are fixed
obstacles: when a bullet reaches another robot first, it stops dead at that
robot, destroying nothing at or beyond its position. A wall that shares its
position with a robot is not doomed by this rule, though: the robot standing
there fires from right on top of it, so nothing can block that particular
shot.

Return the maximum number of distinct walls the robots can destroy together.

### Example 1

```text
Input: robots = [4], distance = [3], walls = [1,10]
Output: 1
Explanation: The robot at 4 fires left with range 3, covering [1, 4], and destroys the wall at 1.
```

### Example 2

```text
Input: robots = [10,2], distance = [5,1], walls = [5,2,7]
Output: 3
Explanation:
    The robot at 10 fires left covering [5, 10], destroying the walls at 5 and 7.
    The robot at 2 fires left covering [1, 2], destroying the wall at 2.
```

### Example 3

```text
Input: robots = [1,2], distance = [100,1], walls = [10]
Output: 0
Explanation: Only the robot at 1 could reach the wall at 10, but firing right its bullet stops at the robot at 2 long before reaching the wall.
```

### Constraints

- `1 <= robots.length == distance.length <= 10⁵`
- `1 <= walls.length <= 10⁵`
- `1 <= robots[i], walls[j] <= 10⁹`
- `1 <= distance[i] <= 10⁵`
- All values in `robots` are unique.
- All values in `walls` are unique.

## Hints

### Hint 1

Sort the robots by position and the walls by value. Working through the
positions in order turns every reachability question into a range query over
the sorted walls.

### Hint 2

A robot never shoots past a neighbor: firing left its bullet stops at the
previous robot, firing right at the next one. Those neighbor positions clip
each shot's range into two candidate intervals.

### Hint 3

Count how many walls fall inside an interval with a binary search — one
lower-bound lookup at each end of the interval.

### Hint 4

Decide the shots while sweeping the sorted robots, keeping the best total so
far for each direction the previous robot fired. When two adjacent robots
fire toward each other, the walls both bullets cover in the gap between them
must be counted only once.
