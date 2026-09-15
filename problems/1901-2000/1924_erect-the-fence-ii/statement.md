# Erect the Fence II

## Description

You are given a 2D integer array `trees` where `trees[i] = [xi, yi]` represents
the location of the `ith` tree in the garden.

You are asked to fence the entire garden using the minimum length of rope
possible. The garden is well-fenced only if all the trees are enclosed and the
rope used forms a perfect circle. A tree is considered enclosed if it is inside
or on the border of the circle.

More formally, you must form a circle using the rope with a center `(x, y)` and
radius `r` where all trees lie inside or on the circle and `r` is minimum.

Return the center and radius of the circle as a length 3 array `[x, y, r]`.
Answers within 10⁻⁵ of the actual answer will be accepted.

### Example 1

```text
Input: trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
Output: [2.00000,2.00000,2.00000]
Explanation: The fence will have center = (2, 2) and radius = 2.
```

![Example 1 fence](figures/example-1.svg)

### Example 2

```text
Input: trees = [[1,2],[2,2],[4,2]]
Output: [2.50000,2.00000,1.50000]
Explanation: The fence will have center = (2.5, 2) and radius = 1.5.
```

![Example 2 fence](figures/example-2.svg)

### Constraints

- `1 <= trees.length <= 3000`
- `trees[i].length == 2`
- `0 <= xi, yi <= 3000`

## Hints

### Hint 1

The minimum-length circular fence is the smallest enclosing circle of the
points. Either one tree sits at the center with radius 0, two trees form a
diameter, or three trees lie on the border — the circle is always determined by
at most three of the input points.

### Hint 2

Welzl's algorithm builds the circle incrementally: keep the smallest circle of
the points seen so far, and whenever a new point falls outside it, that point
must lie on the border of the updated circle. Recomputing with that point fixed
(and repeating the same idea one level deeper for two and three fixed border
points) yields an expected linear-time algorithm.

### Hint 3

With integer coordinates, a point `p` is outside the circle when the squared
distance from `p` to the center exceeds the squared radius — compare squared
distances and use a small epsilon so points exactly on the border are treated
as enclosed.
