# Minimum Number of Arrows to Burst Balloons

## Description

There are some spherical balloons taped onto a flat wall that represents the
XY-plane. The balloons are represented as a 2D integer array `points` where
`points[i] = [x_start, x_end]` denotes a balloon whose horizontal diameter
stretches between `x_start` and `x_end`. You do not know the exact
y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction) from
different points along the x-axis. A balloon with `x_start` and `x_end` is
burst by an arrow shot at `x` if `x_start <= x <= x_end`. There is no limit
to the number of arrows that can be shot. A shot arrow keeps traveling up
infinitely, bursting any balloons in its path.

Given the array `points`, return the minimum number of arrows that must be
shot to burst all balloons.

### Example 1

```text
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
```

### Example 2

```text
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.
```

### Example 3

```text
Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].
```

### Constraints

- `1 <= points.length <= 10^5`
- `points[i].length == 2`
- `-2^31 <= x_start < x_end <= 2^31 - 1`

## Hints

### Hint 1

Sort the balloons by their right endpoint.

### Hint 2

Shoot at the right endpoint of the first remaining balloon; that single arrow pops every balloon whose start is at or before that point.

### Hint 3

Each time an arrow is fired, move to the first balloon it missed and repeat — the answer is the number of arrows fired.
