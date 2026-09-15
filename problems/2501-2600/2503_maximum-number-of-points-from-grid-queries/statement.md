# Maximum Number of Points From Grid Queries

## Description

You are given an `m x n` integer matrix `grid` and an array `queries` of size
`k`.

Find an array `answer` of size `k` such that for each integer `queries[i]` you
start in the top left cell of the matrix and repeat the following process:

- If `queries[i]` is strictly greater than the value of the current cell that
  you are in, then you get one point if it is your first time visiting this
  cell, and you can move to any adjacent cell in all 4 directions: up, down,
  left, and right.
- Otherwise, you do not get any points, and you end this process.

After the process, `answer[i]` is the maximum number of points you can get.
Note that for each query you are allowed to visit the same cell multiple
times.

Return the resulting array `answer`.

### Example 1

```text
Input: grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
Output: [5,8,1]
Explanation: The diagrams above show which cells we visit to get points for each query.
```

![Grid [[1,2,3],[2,5,7],[3,5,1]] with reachable cells below each query shaded: 5, 8 and 1 points.](figures/example-1.svg)

### Example 2

```text
Input: grid = [[5,2,1],[1,1,2]], queries = [3]
Output: [0]
Explanation: We can not get any points because the value of the top left cell is already greater than or equal to 3.
```

![Grid [[5,2,1],[1,1,2]]; the corner value 5 blocks every query below 3, so no points are scored.](figures/example-2.svg)

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 1000`
- `4 <= m * n <= 10⁵`
- `k == queries.length`
- `1 <= k <= 10⁴`
- `1 <= grid[i][j], queries[i] <= 10⁶`

## Hints

### Hint 1

The queries are all given to you beforehand so you can answer them in any order you want.

### Hint 2

Sort the queries knowing their original order to be able to build the answer array.

### Hint 3

Run a BFS on the graph and answer the queries in increasing order.
