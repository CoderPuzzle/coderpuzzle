# Maximize Grid Happiness

## Description

You are given four integers `m`, `n`, `introvertsCount`, and `extrovertsCount`.
There is an `m x n` grid, and two kinds of people to house in it:
`introvertsCount` introverts and `extrovertsCount` extroverts.

You decide how many people actually live in the grid — you do not have to
use all of them — and assign each one a cell, at most one person per cell.

The happiness of each person is calculated as follows:

- An introvert starts with 120 happiness and loses 30 happiness for each
  neighbor, introvert or extrovert.
- An extrovert starts with 40 happiness and gains 20 happiness for each
  neighbor, introvert or extrovert.

A neighbor is a person living in a directly adjacent cell — north, east,
south, or west of the person's cell.

The grid happiness is the sum of each person's happiness. Return the
maximum possible grid happiness.

### Example 1

![diagram](figures/1659-1.svg)

```text
Input: m = 2, n = 3, introvertsCount = 1, extrovertsCount = 2
Output: 240
Explanation: Assume the grid is 1-indexed with coordinates (row, column).
We can put the introvert in cell (1,1) and put the extroverts in cells
(1,3) and (2,3).
- Introvert at (1,1) happiness: 120 (starting happiness) - (0 * 30) (0 neighbors) = 120
- Extrovert at (1,3) happiness: 40 (starting happiness) + (1 * 20) (1 neighbor) = 60
- Extrovert at (2,3) happiness: 40 (starting happiness) + (1 * 20) (1 neighbor) = 60
The grid happiness is 120 + 60 + 60 = 240.
```

### Example 2

```text
Input: m = 3, n = 1, introvertsCount = 2, extrovertsCount = 1
Output: 260
Explanation: Place the two introverts in (1,1) and (3,1) and the extrovert
at (2,1).
- Introvert at (1,1) happiness: 120 (starting happiness) - (1 * 30) (1 neighbor) = 90
- Extrovert at (2,1) happiness: 40 (starting happiness) + (2 * 20) (2 neighbors) = 80
- Introvert at (3,1) happiness: 120 (starting happiness) - (1 * 30) (1 neighbor) = 90
The grid happiness is 90 + 80 + 90 = 260.
```

### Example 3

```text
Input: m = 2, n = 2, introvertsCount = 4, extrovertsCount = 0
Output: 240
```

### Constraints

- `1 <= m, n <= 5`
- `0 <= introvertsCount, extrovertsCount <= min(m * n, 6)`

## Hints

### Hint 1

For each cell there are three options: leave it empty, put an introvert in
it, or put an extrovert in it.

### Hint 2

Run a DP whose state carries the occupancy of the previous row, the number
of introverts and extroverts still unused, and the current row and column,
then try the three options for each cell.

### Hint 3

Treat the columns already filled in the current row as though they belonged
to the previous row, so one rolling window of n cells holds every neighbor
a new placement can touch.
