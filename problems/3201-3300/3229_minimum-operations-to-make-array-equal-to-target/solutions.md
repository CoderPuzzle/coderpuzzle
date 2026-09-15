# Solutions — Minimum Operations to Make Array Equal to Target

## Positive rises of the difference array

Work with the difference d[i] = nums[i] - target[i]: each operation adds +1 or -1 to a contiguous run of d, and the goal is to build d from the all-zero state. Adding a unit interval changes d's boundary behavior by one step at each of its two edges, so every operation can supply exactly one unit of "upward step"; the total upward demand is the sum of positive increases along the sequence extended with implicit zeros on both sides — 0, d[0], d[1], ..., d[n-1], 0. That sum is simultaneously a lower bound (each operation covers one rise) and achievable (pair each rise with a later fall into one interval), so it is the exact answer.

The code is that sum stated as a loop: prev starts at 0, and whenever the current difference rises above prev the rise is added; after the scan, if the last difference is negative, its climb back to the trailing implicit zero is added too. A final positive difference needs nothing extra, because its drop to zero is a fall — the closing edge of intervals already opened earlier. Increases and decreases of nums are handled uniformly, since a -1 operation is just an interval whose contribution appears as a rise out of a negative dip.

Equivalently, the answer is half the total variation of the padded difference sequence, which is why both examples check out: constant offsets cost one bulk operation plus the residual, and alternating deviations cost one operation per oscillation.

**Complexity:** `O(n)` time, `O(1)` space.
