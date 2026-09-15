# Solutions — Reduction Operations to Make the Array Elements Equal

Simulating the operations one at a time is quadratic or worse, but the
total is easy to see from the sorted order: every element must be
lowered through each distinct value strictly below it exactly once, and
each such step is one operation.

## Sorted level count

Sort `nums` ascending and scan it, keeping `level`, how many distinct
values strictly smaller than the current one have been passed. Whenever
`nums[i] > nums[i - 1]`, increment `level` (a new lower tier has been
crossed); add `level` to the answer for position `i`. The smallest value
contributes nothing since everything must come down to it.

This counts, for each element, the number of distinct strictly-greater
values above it — exactly the number of reductions that element
undergoes — and their sum is the total operation count. The answer can
reach about `5*10^4 * 5*10^4 = 2.5 * 10^9`, so accumulate in 64 bits.

**Complexity:** `O(n log n)` time for the sort, `O(n)` space (or `O(1)`
extra when sorting in place).
