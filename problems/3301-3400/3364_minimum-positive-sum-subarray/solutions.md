# Solutions — Minimum Positive Sum Subarray

## Prefix-Sum Window Enumeration

Every candidate window can be enumerated directly: for each start index,
try each length from `l` through `r` and keep the smallest positive total.
Prefix sums make that enumeration cheap — `prefix[i]` holds the sum of the
first `i` elements, so the sum of any window is a single subtraction, and
the whole scan visits at most `n · r` windows. With `n <= 100` and
`|nums[i]| <= 1000` every partial sum stays far inside 32-bit range.

A window qualifies only when its sum is strictly greater than zero — a sum
of exactly `0` does not count — so the scan simply skips non-positive
totals and tracks the minimum among the positive ones. If no window
qualifies, the answer stays `-1`.

**Complexity:** `O(n²)` time, `O(n)` space.
