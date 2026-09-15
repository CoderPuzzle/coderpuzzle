# Solutions — Sum of Subarray Ranges

## Incremental Min/Max over All Subarrays

The key observation is that extending a subarray by one element updates its range in O(1): the max of `nums[i..j]` is the max of the max of `nums[i..j-1]` and `nums[j]`, and likewise for the min. So instead of rescanning each subarray, the solution fixes a left endpoint `i`, initializes `mn = mx = nums[i]`, and then sweeps `j` from `i + 1` rightward, adjusting `mn` when a smaller element appears (and `mx` when a larger one does) and adding the current `mx − mn` to the running total for every extended subarray.

The `elif` is safe because a single new element cannot be both a strict new minimum and a strict new maximum; if it equals an existing bound or lies between them, neither value changes. Subarrays of length 1 contribute `0` and are simply skipped by starting `j` at `i + 1`, so the total is exactly the sum of `max − min` over all subarrays.

With `n ≤ 1000`, the roughly `n²/2` iterations (at most ~500,000) run comfortably within limits, which is why the canonical solution does not need the O(n) monotonic-stack follow-up. Only two scalar accumulators are kept besides the total.

**Complexity:** `O(n²)` time, `O(1)` space.
