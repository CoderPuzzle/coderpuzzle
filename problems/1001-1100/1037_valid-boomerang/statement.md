# Valid Boomerang

## Description

Given an array `points` where `points[i] = [xi, yi]` represents a point on
the X-Y plane, return `true` if these points are a boomerang.

A boomerang is a set of three points that are all distinct and not in a
straight line.

### Example 1

```text
Input: points = [[1,1],[2,3],[3,2]]
Output: true
```

### Example 2

```text
Input: points = [[1,1],[2,2],[3,3]]
Output: false
```

### Constraints

- `points.length == 3`
- `points[i].length == 2`
- `0 <= xi, yi <= 100`

## Hints

### Hint 1

3 points form a boomerang if and only if the triangle formed from them has
non-zero area.
