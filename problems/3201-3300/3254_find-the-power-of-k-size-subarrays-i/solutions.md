# Solutions — Find the Power of K-Size Subarrays I

## Sliding consecutive-run counter

A window earns its maximum element only when every adjacent pair inside it
steps up by exactly one; a duplicate, a drop, or any larger jump breaks the
chain and dooms every window containing it. That local condition lets the
whole answer ride on one number per position: `run[i]`, the count of
consecutive +1 steps ending at index `i`. It updates in constant time —
`run[i] = run[i - 1] + 1` when `nums[i] == nums[i - 1] + 1`, else it resets
to `0` — and a size-`k` window starting at `i` is powered precisely when
`run[i + k - 1] >= k - 1`, meaning the last `k - 1` adjacent pairs of the
window all stepped up by one.

So one left-to-right pass computes `run` while emitting answers: as soon as
index `i` reaches `k - 1` a window ends there, and `results[i - k + 1]` is
`nums[i]` when the counter still stands at least `k - 1`, otherwise `-1`.
No window is ever rescanned — a break inside it forced the counter to
restart after that point, so by the time the window's last index arrives
the counter can only be large enough if the whole window is clean. The
degenerate `k = 1` falls out for free: the requirement `run >= 0` holds at
every index, so each element reports itself, matching the definition's
one-element reading.

**Complexity:** `O(n)` time, `O(1)` space beyond output.
