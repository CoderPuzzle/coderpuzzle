# Path With Minimum Effort

## Description

You are a hiker preparing for an upcoming hike. You are given `heights`, a 2D
array of size `rows x columns`, where `heights[row][col]` represents the height
of cell `(row, col)`. You are situated in the top-left cell `(0, 0)`, and you
hope to travel to the bottom-right cell `(rows-1, columns-1)` (i.e.,
0-indexed). You can move up, down, left, or right, and you wish to find a route
that requires the minimum effort.

A route's effort is the **maximum absolute difference** in heights between two
consecutive cells of the route.

Return the minimum effort required to travel from the top-left cell to the
bottom-right cell.

### Example 1

```text
Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in
consecutive cells. This is better than the route of [1,2,2,2,5], where the
maximum absolute difference is 3.
```

![The 3x3 grid with the route 1, 3, 5, 3, 5 down the left column and along the bottom shaded green.](figures/example-1.svg)

### Example 2

```text
Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in
consecutive cells, which is better than route [1,3,5,3,5].
```

![The 3x3 grid with the route 1, 2, 3, 4, 5 along the top row and right column shaded green.](figures/example-2.svg)

### Example 3

```text
Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
Output: 0
Explanation: This route does not require any effort.
```

![The 5x5 grid where the route snakes through all the 1-cells, avoiding every 2.](figures/example-3.svg)

### Constraints

- `rows == heights.length`
- `columns == heights[i].length`
- `1 <= rows, columns <= 100`
- `1 <= heights[i][j] <= 10^6`

## Hints

### Hint 1

Consider the grid as a graph, where adjacent cells have an edge with cost equal to the difference between the cells.

### Hint 2

If you are given a threshold k, check if it is possible to go from (0, 0) to (rows-1, columns-1) using only edges of cost <= k.

### Hint 3

Binary search the k value (or use a modified Dijkstra where the path cost is the maximum edge, not the sum).
