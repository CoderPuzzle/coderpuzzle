# Solutions — Number of Subarrays with Bounded Maximum

## At-most subtraction with a running streak length

Counting subarrays whose maximum lies in `[left, right]` directly is awkward because the condition is a double inequality on a max. Reduce it to two one-sided counts: let `atMost(bound)` be the number of subarrays whose maximum is at most `bound`; then the answer is `atMost(right) - atMost(left - 1)`, since a subarray's max is in `[left, right]` exactly when it is at most `right` but not at most `left - 1`. Both counts share one helper.

`atMost(bound)` is computable in a single sweep: keep `run`, the length of the current streak of consecutive elements that are at most `bound`. An element within the streak ends exactly `run` new subarrays (those starting at each position of the streak and ending here, all with max at most `bound`), so add `run` to the total after incrementing it. An element above `bound` can appear in no valid subarray and resets the streak to zero.

This double-counts nothing because each subarray is counted exactly once at its right endpoint. The `left - 1` subtraction also handles the `left = 0` edge cleanly when `left - 1 = -1`: no element (all at least 0) qualifies, so the subtracted count is zero. Elements below `left` but within a streak correctly extend subarrays whose max is supplied by an earlier element.

**Complexity:** `O(n)` time (two linear passes), `O(1)` space.
