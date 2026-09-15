# Best Position for a Service Centre

## Description

A delivery company wants to build a new service centre in a city. The
company knows the positions of all its customers on a 2D map and wants to
build the centre at a position that minimizes the sum of the Euclidean
distances to all customers.

Given an array `positions`, where `positions[i] = [xi, yi]` is the position
of the `i`-th customer on the map, return the minimum possible sum of the
Euclidean distances from the service centre to all customers.

In other words, choose a centre position `[xcentre, ycentre]` that minimizes
the sum, over every customer `i`, of the distance between `[xcentre,
ycentre]` and `[xi, yi]`.

![diagram](figures/1515-1.svg)

Answers within `10⁻⁵` of the actual value will be accepted.

### Example 1

![diagram](figures/1515-2.svg)

```text
Input: positions = [[0,1],[1,0],[1,2],[2,1]]
Output: 4.00000
Explanation: Choosing [xcentre, ycentre] = [1, 1] makes the distance to each
customer equal to 1, so the sum of all distances is 4, which is the minimum
possible.
```

### Example 2

![diagram](figures/1515-3.svg)

```text
Input: positions = [[1,1],[3,3]]
Output: 2.82843
Explanation: The minimum possible sum of distances is sqrt(2) + sqrt(2) =
2.82843.
```

### Constraints

- `1 <= positions.length <= 50`
- `positions[i].length == 2`
- `0 <= xi, yi <= 100`

## Hints

### Hint 1

The problem can be reworded as: given a set of points on a 2D plane, return
the geometric median.

### Hint 2

Loop over each triplet of points `(positions[i], positions[j],
positions[k])` where `i < j < k`, find the centre of the circle passing
through the three points, and check whether all other points lie within
that circle.
