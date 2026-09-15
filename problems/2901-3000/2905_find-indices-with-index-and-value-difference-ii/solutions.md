# Solutions — Find Indices With Index and Value Difference II

## Prefix minimum and maximum window scan

For a later index `j`, every legal partner `t` must satisfy
`t <= j - indexDifference`, and the largest `abs(nums[t] - nums[j])` over
that window is always attained at one of its extremes — the window minimum
or the window maximum. So a single left-to-right pass suffices: as `j`
advances, index `j - indexDifference` enters the window, and two running
variables remember the first index attaining the minimum and the first
index attaining the maximum of everything seen so far. When either extreme
reaches `valueDifference` away from `nums[j]`, `[extreme index, j]` is the
answer; if the loop finishes with no qualifying `j`, no pair exists and
`[-1, -1]` is returned.

The statement allows many valid answers, so the pass pins one
deterministically: the minimum candidate is tested before the maximum, and
on equal values the earlier index is kept. When `indexDifference` is `0`,
each `j` enters its own window first, so `[0, 0]` is returned exactly when
`valueDifference` is also `0` — the note that `i` and `j` may be equal.
Values are at most `10⁹`, so every difference fits comfortably in a signed
32-bit integer.

**Complexity:** `O(n)` time, `O(1)` auxiliary space beyond the returned
pair.
