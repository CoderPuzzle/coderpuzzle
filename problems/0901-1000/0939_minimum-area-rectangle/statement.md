# Minimum Area Rectangle

## Description

You are given an array of points in the X-Y plane, `points`, where
`points[i] = [xi, yi]`.

Return the minimum area of a rectangle formed from these points, with sides
parallel to the X and Y axes. Such a rectangle takes two distinct
x-coordinates and two distinct y-coordinates, with all four corners present
in `points`, so it always has positive width and height — points that only
share a row or a column never close one.

If there is not any such rectangle, return `0`.

### Example 1

![diagram](figures/939-1.svg)

```text
Input: points = [[1,1],[1,3],[3,1],[3,3],[2,2]]
Output: 4
Explanation: The points (1,1), (1,3), (3,1), and (3,3) are the corners of
the only rectangle, which spans width 2 and height 2. The point (2,2) lies
inside it and closes nothing.
```

### Example 2

![diagram](figures/939-2.svg)

```text
Input: points = [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]
Output: 2
Explanation: The corners close three rectangles: spanning x = 1 to x = 3
(area 4), x = 1 to x = 4 (area 6), and x = 3 to x = 4 with height 2
(area 2). The smallest one wins.
```

### Constraints

- `1 <= points.length <= 500`
- `points[i].length == 2`
- `0 <= xi, yi <= 4 * 10⁴`
- All the given points are unique.
