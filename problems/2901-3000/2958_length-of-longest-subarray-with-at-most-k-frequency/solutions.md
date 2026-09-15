# Solutions — Length of Longest Subarray With at Most K Frequency

A subarray is good exactly when no value occurs more than `k` times inside
it, and shrinking a good subarray keeps it good — frequencies only drop.
That monotonicity is the license for a window: as the right edge advances,
the left edge never needs to move backward.

## Sliding window with live counts

Expand the window one element at a time, counting occurrences of each
value in a hash map. The only way the freshly added element `nums[r]` can
break goodness is by pushing its own count past `k` — every other value's
count is unchanged — so the repair is always to shrink from the left until
one copy of `nums[r]` falls out. Each index enters and leaves the window
at most once, so the two edges together make one linear pass, with the
hash map updated `O(1)` per step.

After each repair the window `[left, r]` is the longest good window ending
at `r`, and the answer is the maximum window width seen. The answer is at
most `n <= 10⁵`, well inside 32-bit range.

**Complexity:** `O(n)` time, `O(n)` space.
