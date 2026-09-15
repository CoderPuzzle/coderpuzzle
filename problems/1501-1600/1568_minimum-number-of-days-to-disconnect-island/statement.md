# Minimum Number of Days to Disconnect Island

## Description

You are given a rectangular `grid` in which every cell holds `1` for land or
`0` for water. An **island** is a maximal group of land cells joined edge to
edge — touching only at a corner does not join two cells.

The grid is **connected** when it holds exactly one island. Any other count —
zero islands, because every cell is water, or two or more separate islands —
makes it **disconnected**.

In one day you may turn a single land cell into a water cell. Return the
minimum number of days needed to turn `grid` into a disconnected grid.

### Example 1

![diagram](figures/1568-1.svg)

```text
Input: grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]
Output: 2
Explanation: The four land cells form one solid 2x2 block, and removing any
single one of them still leaves the rest joined into one island. Turning
grid[0][2] and grid[1][1] to water leaves two separate single-cell islands,
so two days suffice — and one is not enough.
```

### Example 2

![diagram](figures/1568-2.svg)

```text
Input: grid = [[1,1]]
Output: 2
Explanation: The two land cells form one island. Removing either one leaves a
single land cell, which is still exactly one island, so a single day cannot
disconnect the grid. Turning both cells to water leaves an all-water grid,
which counts as disconnected — zero islands, not one — so two days suffice.
```

### Constraints

- `grid` holds between `1` and `30` rows, each holding the same number of
  columns, also between `1` and `30`.
- Every cell holds `0` or `1`.

## Hints

### Hint 1

Return `0` if the grid is already disconnected.

### Hint 2

Return `1` if turning some single land cell to water disconnects the grid.

### Hint 3

Otherwise return `2`.

### Hint 4

Two days always suffice — the answer never needs to exceed 2.
