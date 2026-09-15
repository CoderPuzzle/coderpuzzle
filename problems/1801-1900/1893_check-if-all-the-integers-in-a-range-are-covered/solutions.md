# Solutions — Check if All the Integers in a Range Are Covered

Checking each of up to 50 query points against all 50 ranges already
fits the constraints, but the same question — "which points are
covered?" — has a linear-time answer that scales: sweep a difference
array once and read off coverage.

## Difference-array coverage sweep

Add `+1` at each interval's start and `-1` just past its end, then take
a running sum over the value axis; a point is covered exactly when that
sum is positive. The answer is whether every point in `[left, right]`
is covered. Values stay within 50 ranges, so no counter can overflow.

**Complexity:** `O(n + V)` time for `n` intervals and value bound `V`,
`O(V)` extra space.
