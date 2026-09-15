# Check If It Is a Straight Line

## Description

You are given an integer array `coordinates`, `coordinates[i] = [x, y]`, where
`[x, y]` represents the coordinate of a point. Check if these points make a
straight line in the XY plane.

### Example 1

![diagram](figures/1232-1.svg)

```text
Input: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
Output: true
```

### Example 2

![diagram](figures/1232-2.svg)

```text
Input: coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
Output: false
```

### Constraints

- `2 <= coordinates.length <= 1000`
- `coordinates[i].length == 2`
- `-10⁴ <= coordinates[i][0], coordinates[i][1] <= 10⁴`
- `coordinates` contains no duplicate point.

## Hints

### Hint 1

If there're only 2 points, return true.

### Hint 2

Check if all other points lie on the line defined by the first 2 points.

### Hint 3

Use cross product to check collinearity.
