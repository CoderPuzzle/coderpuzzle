# Maximum Partition Factor

## Description

You are given a 2D integer array `points`, where `points[i] = [xi, yi]`
holds the coordinates of the ith point on the Cartesian plane.

The Manhattan distance between two points `points[i] = [xi, yi]` and
`points[j] = [xj, yj]` is `|xi - xj| + |yi - yj|`.

Split the n points into exactly two non-empty groups. The partition factor
of a split is the smallest Manhattan distance among all unordered pairs of
points that land in the same group; a group of size 1 contributes no pairs.
When n = 2 both groups are singletons, so no intra-group pair exists and
the partition factor is defined to be 0 in that case.

Return the maximum possible partition factor over all valid splits.

### Example 1

```text
Input: points = [[0,0],[0,2],[2,0],[2,2]]
Output: 4
Explanation: Split the points into {[0,0],[2,2]} and {[0,2],[2,0]}. The
only pair in the first group has distance |0 - 2| + |0 - 2| = 4, and the
only pair in the second group also has distance 4. The partition factor is
min(4, 4) = 4, which is maximal.
```

### Example 2

```text
Input: points = [[0,0],[0,1],[10,0]]
Output: 11
Explanation: Put [0,1] and [10,0] in one group and leave [0,0] as the
other group. The only intra-group pair has distance |0 - 10| + |1 - 0| =
11, the singleton contributes no pair, and the partition factor 11 is
maximal.
```

### Constraints

- `2 <= points.length <= 500`
- `points[i].length == 2`
- `-10⁸ <= xi, yi <= 10⁸`

## Hints

### Hint 1

Use binary search.

### Hint 2

Binary-search the partition factor D to maximize it.

### Hint 3

For a candidate D, add an edge between points i and j whenever their
Manhattan distance is less than D — such pairs must land in different
groups.

### Hint 4

Check whether the resulting graph is bipartite.
