# Count Number of Rectangles Containing Each Point

## Description

You are given a 2D integer array `rectangles` where
`rectangles[i] = [l_i, h_i]` indicates that the `i-th` rectangle has a length
of `l_i` and a height of `h_i`. You are also given a 2D integer array `points`
where `points[j] = [x_j, y_j]` is a point with coordinates `(x_j, y_j)`.

The `i-th` rectangle has its bottom-left corner point at the coordinates
`(0, 0)` and its top-right corner point at `(l_i, h_i)`.

Return an integer array `count` of length `points.length` where `count[j]` is
the number of rectangles that contain the `j-th` point.

The `i-th` rectangle contains the `j-th` point if `0 <= x_j <= l_i` and
`0 <= y_j <= h_i`. Note that points that lie on the edges of a rectangle are
also considered to be contained by that rectangle.

### Example 1

![diagram](figures/2250-1.svg)

```
Input: rectangles = [[1,2],[2,3],[2,5]], points = [[2,1],[1,4]]
Output: [2,1]
Explanation:
The first rectangle contains no points.
The second rectangle contains only the point (2, 1).
The third rectangle contains the points (2, 1) and (1, 4).
The number of rectangles that contain the point (2, 1) is 2.
The number of rectangles that contain the point (1, 4) is 1.
Therefore, we return [2, 1].
```

### Example 2

![diagram](figures/2250-2.svg)

```
Input: rectangles = [[1,1],[2,2],[3,3]], points = [[1,3],[1,1]]
Output: [1,3]
Explanation:
The first rectangle contains only the point (1, 1).
The second rectangle contains only the point (1, 1).
The third rectangle contains the points (1, 3) and (1, 1).
The number of rectangles that contain the point (1, 3) is 1.
The number of rectangles that contain the point (1, 1) is 3.
Therefore, we return [1, 3].
```

### Constraints

- `1 <= rectangles.length, points.length <= 5 * 10⁴`
- `rectangles[i].length == points[j].length == 2`
- `1 <= l_i, x_j <= 10⁹`
- `1 <= h_i, y_j <= 100`
- All the rectangles are unique.
- All the points are unique.

## Hints

### Hint 1

The heights of the rectangles and the y-coordinates of the points are only at most 100, so for each point, we can iterate over the possible heights of the rectangles that contain a given point.

### Hint 2

For a given point and height, can we efficiently count how many rectangles with that height contain our point?

### Hint 3

Sort the rectangles at each height and use binary search.
