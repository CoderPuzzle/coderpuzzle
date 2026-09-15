# Solutions — Minimum Path Sum

## Dynamic programming, in place

Every path into a cell arrives by exactly one of two moves, from the cell above or from the cell to the left, so the cheapest sum ending at `(i, j)` is the cell's own value plus the smaller of the two running sums that have already reached those neighbors. The first row and the first column are the boundary cases — each of their cells has a single predecessor, so their running sums are plain prefixes — and the recurrence fills in everything else. After a row-major scan, what sits in the bottom-right corner is the minimum path sum.

The grid itself carries the table: each cell is overwritten in place with the cheapest sum reaching it, so no second table is ever allocated. The overwrite order is what makes this safe — by the time a cell is updated, the value above it was written on the previous row and the value to its left earlier in the current row, and no cell is ever read again after being replaced.

A path crosses `m + n - 1 <= 399` cells of value at most 200, so no running sum ever exceeds 79,800. Every prefix and the final answer therefore fit the grid's own 32-bit integers, and the fixed-width ports accumulate in place without widening.

**Complexity:** `O(mn)` time, `O(1)` extra space.
