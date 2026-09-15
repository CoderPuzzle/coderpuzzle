# Minimum Number of Lines to Cover Points

## Description

You are given an array points where points[i] = [x_i, y_i] represents a point
on an X-Y plane.

Straight lines are going to be added to the X-Y plane, such that every point
is covered by at least one line.

Return the minimum number of straight lines needed to cover all the points.

### Example 1

![diagram](figures/2152-1.svg)

```text
Input: points = [[0,1],[2,3],[4,5],[4,3]]
Output: 2
Explanation: The minimum number of straight lines needed is two. One possible solution is to add:
- One line connecting the point at (0, 1) to the point at (4, 5).
- Another line connecting the point at (2, 3) to the point at (4, 3).
```

### Example 2

![diagram](figures/2152-2.svg)

```text
Input: points = [[0,2],[-2,-2],[1,4]]
Output: 1
Explanation: The minimum number of straight lines needed is one. The only solution is to add:
- One line connecting the point at (-2, -2) to the point at (1, 4).
```

### Constraints

- `1 <= points.length <= 10`
- `points[i].length == 2`
- `-100 <= x_i, y_i <= 100`
- All the points are unique.

## Hints

### Hint 1

What is the highest possible answer for a set of n points?

### Hint 2

The highest possible answer is n / 2 (rounded up). This is because you can
cover at least two points with a line, and if n is odd, you need to add one
extra line to cover the last point.

### Hint 3

Suppose you have a line covering two points, how can you quickly check if a
third point is also covered by that line?

### Hint 4

Calculate the slope from the first point to the second point. If the slope
from the first point to the third point is the same, then it is also covered
by that line.
