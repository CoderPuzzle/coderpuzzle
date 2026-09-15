# Solutions — Transform Array to All Equal Elements

## Forced-flip greedy scan, per target

An all-equal array must be all `1` or all `-1`, so try each target
separately and ask for the minimum number of flips. Position `i` is touched
only by the flips at `i - 1` and at `i` itself, which makes the whole
schedule forced: scanning left to right, the flip at `i - 1` is already
decided when the scan reaches `i`, and the flip at `i` — the last one that
can still change this position — must fire exactly when the value it would
leave behind misses the target. Carrying just that one-bit history in a
`prev` flag, the scan counts the forced flips in a single pass with no
array writes.

The scan proves the minimum by construction — no schedule can use fewer
flips than the forced ones — but a target is only achievable at all if the
last element comes out right, since no flip at index `n - 1` exists to
repair it. A target is feasible exactly when its final check passes and
its forced count is at most `k`; the answer is the OR over the two
targets. Elements only ever hold `±1`, so every product stays within
32-bit range.

**Complexity:** `O(n)` time, `O(1)` space.
