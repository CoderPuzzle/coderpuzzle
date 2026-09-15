# Max Points on a Line

## Description

Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

### Example 1

![diagram](figures/149-1.svg)

```text
Input: points = [[1,1],[2,2],[3,3]]
Output: 3
```

### Example 2

![diagram](figures/149-2.svg)

```text
Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
```

### Constraints

- `1 <= points.length <= 300`
- `points[i].length == 2`
- `-10⁴ <= xi, yi <= 10⁴`
- All the points are unique.
