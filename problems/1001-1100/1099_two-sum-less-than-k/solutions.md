# Solutions — Two Sum Less Than K

## Sort, then scan with two pointers

Sorting the array lines the values up from smallest to largest, which
lets a pair of pointers — one at the left end, one at the right end —
hunt for the best sum together. The left pointer starts at the smallest
value and the right pointer at the largest, so the two cover the full
range of candidate pairs in a single pass.

At each step the pointers name a sum `nums[lo] + nums[hi]`. If it is
below `k` it is a valid pair, and since `hi` is the largest remaining
value no other partner for `lo` can produce a bigger sum, so the sum is
recorded and `lo` advances. If the sum is at or above `k`, the only way
to bring it down is to move `hi` left toward smaller values. Either way
one pointer moves, so the scan visits each element a constant number of
times. Because all values are positive, the best answer found this way
is exactly the maximum pair sum below `k`; a fresh `-1` reports that no
valid pair exists.

The pointers do the whole search in linear time, but the sort that
precedes them dominates the cost.

**Complexity:** `O(n log n)` time, `O(1)` extra space beyond the sort.
