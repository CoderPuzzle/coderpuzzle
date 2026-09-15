# Find a Peak Element II

## Description

A peak element in a 2D grid is an element that is strictly greater than all
of its adjacent neighbors to the left, right, top, and bottom.

Given a 0-indexed `m x n` matrix `mat` of integers where no two adjacent
cells are equal, find a peak element `mat[i][j]` and return the length-2
array `[i, j]`.

You may assume that the entire matrix is surrounded by an outer perimeter
with the value `-1` in each cell.

While a matrix may contain several peaks in general, the judge's test
matrices are constructed so that exactly one peak exists, which makes the
expected answer unique.

You must write an algorithm that runs in `O(m log(n))` or `O(n log(m))` time.

### Example 1

```text
Input: mat = [[1,4],[2,3]]
Output: [0,1]
Explanation: 4 is strictly greater than its neighbors 1 (left) and 3 (below),
and greater than the -1 perimeter cells above and to the right, so [0,1] is
the peak.
```

![Example 1 matrix](figures/example-1.svg)

### Example 2

```text
Input: mat = [[10,20,15],[21,30,14],[7,16,12]]
Output: [1,1]
Explanation: 30 is strictly greater than its neighbors 20 (above), 16 (below),
21 (left), and 14 (right), so [1,1] is the peak.
```

![Example 2 matrix](figures/example-2.svg)

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 500`
- `1 <= mat[i][j] <= 10^5`
- No two adjacent cells are equal.

## Hints

### Hint 1

Split the matrix around a central column and look for the maximum over that column and its two neighboring columns.

### Hint 2

If that maximum lies in the central column, it is a peak: it beats its row neighbors and both vertical neighbors by construction.

### Hint 3

Otherwise recurse into the side that contained the maximum, keeping the central column.
