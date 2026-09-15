# Making A Large Island

## Description

You are given an `n x n` binary matrix `grid`. You are allowed to change at
most one `0` to be `1`.

Return the size of the largest island in `grid` after applying this operation.

An island is a 4-directionally connected group of `1`s.

### Example 1

```text
Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with
area = 3.
```

### Example 2

```text
Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island
with area = 4.
```

### Example 3

```text
Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.
```

### Constraints

- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 500`
- `grid[i][j]` is either `0` or `1`.

## Hints

### Hint 1

First label every existing island with a distinct id and record its size in one DFS/BFS pass.

### Hint 2

For each 0 cell, add 1 to the sum of sizes of the distinct neighboring islands; collect neighbor ids in a set so an island touching the cell on two sides is not counted twice.

### Hint 3

The answer is the maximum over all flips and the largest existing island, which also covers the all-1s grid where nothing can be flipped.
