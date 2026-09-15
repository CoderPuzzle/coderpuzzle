# Solutions — Adjacent Increasing Subarrays Detection I

## Run lengths, then a constant-time window test

A window of `k` elements is strictly increasing exactly when the strictly
increasing run ending at its last index is at least `k` long: an ascent
chain cannot cross a non-increasing pair, and within a run every window is
increasing. One linear pass therefore reduces each candidate window to a
single comparison — record `run[i]`, the length of the strictly increasing
run ending at index `i`, resetting to `1` wherever `nums[i]` fails to
exceed `nums[i - 1]`, which is precisely the strictness the statement
demands.

Two adjacent length-`k` windows cover `2k` consecutive elements and their
last indices sit exactly `k` apart, so the answer is yes exactly when some
`i` (at least `2k - 1`, so both windows fit inside the array) satisfies
`run[i] >= k` and `run[i - k] >= k`. The first condition certifies the
window ending at `i`, the second the window ending `k` positions earlier,
and the gap of exactly `k` makes them adjacent. A single scan over `i`
checks every placement.

**Complexity:** `O(n)` time, `O(n)` space, where `n = nums.length`.
