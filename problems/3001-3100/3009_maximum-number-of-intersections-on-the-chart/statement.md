# Maximum Number of Intersections on the Chart

## Description

There is a line chart consisting of n points connected by line segments. You
are given a 1-indexed integer array y. The kth point has coordinates
(k, y[k]). There are no horizontal lines; that is, no two consecutive points
have the same y-coordinate.

We can draw an infinitely long horizontal line. Return the maximum number of
points of intersection of the line with the chart.

### Example 1

![diagram](figures/3009-1.svg)

```text
Input: y = [1,2,1,2,1,3,2]
Output: 5
Explanation: As you can see in the image above, the line y = 1.5 has 5
intersections with the chart (in red crosses). You can also see the line
y = 2 which intersects the chart in 4 points (in red crosses). It can be
shown that there is no horizontal line intersecting the chart at more than 5
points. So the answer would be 5.
```

### Example 2

![diagram](figures/3009-2.svg)

```text
Input: y = [2,1,3,4,5]
Output: 2
Explanation: As you can see in the image above, the line y = 1.5 has 2
intersections with the chart (in red crosses). You can also see the line
y = 2 which intersects the chart in 2 points (in red crosses). It can be
shown that there is no horizontal line intersecting the chart at more than 2
points. So the answer would be 2.
```

### Constraints

- `2 <= y.length <= 10⁵`
- `1 <= y[i] <= 10⁹`
- `y[i] != y[i + 1] for i in range [1, n - 1]`

## Hints

### Hint 1

We move a horizontal line from the bottom of the chart to the top.

### Hint 2

For each point we reach, the number of intersections might change, so we
have to count it.

### Hint 3

If a point we just reached is lower than its previous/next point, the number
of intersections increases.

### Hint 4

If a point we just reached is higher than its previous/next point, the
number of intersections decreases.

### Hint 5

There is also another solution using Fenwick Tree.
