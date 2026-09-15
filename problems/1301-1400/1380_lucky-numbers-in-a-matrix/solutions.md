# Solutions — Lucky Numbers in a Matrix

## Approach: Row minima intersect column maxima

A lucky number belongs to both the set of row minima and the set of column
maxima, and since all entries are distinct each set holds at most one value
per row/column. Compute the minimum of every row and the maximum of every
column, then a lucky number is exactly an element of the intersection — with
distinct values, an element equal to its row's minimum and its column's
maximum. The result is sorted ascending for deterministic comparison.

**Complexity:** `O(m * n)` time for an `m x n` matrix, `O(m + n)` extra
space.
