# Solutions — Find the Number of Subarrays Where Boundary Elements Are Maximum

## Monotonic stack with per-value position lists

Count, for each right endpoint `i`, the valid subarrays ending there. Such a subarray `[k..i]` needs `nums[k] = nums[i]` (both boundaries equal the maximum, which must then be `nums[i]`) and no element greater than `nums[i]` in between — interior elements equal to `nums[i]` are fine because the maximum may repeat. So the valid starts are exactly the positions of value `nums[i]` inside the stretch since the last strictly greater element.

That stretch is delimited by `leftGreater[i]`, the nearest index to the left with a strictly greater value, computed with one monotonic stack pass: pop indices whose values are at most the current one (they can never be the "last greater" for a future element), record the survivor below, then push `i`. Equal values get popped, which is what makes the boundary strict.

The second pass keeps, per distinct value, the sorted list of its earlier positions — appended in increasing index order, so always sorted. The number of those positions beyond `leftGreater[i]` is `len(list) - bisect_right(list, leftGreater[i])` via binary search, and adding 1 covers the singleton `[i..i]` whose maximum is trivially its own boundary. Summing over all `i` counts every valid subarray exactly once, by its right endpoint.

**Complexity:** `O(n log n)` time, `O(n)` space.
