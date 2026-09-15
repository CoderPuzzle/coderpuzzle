# Solutions — Find Minimum in Rotated Sorted Array II

## Binary search with an ambiguity shrink

The minimum of a rotated sorted array sits exactly at the rotation point, and comparing the midpoint with the window's right end tells which side of the midpoint that point is on. When `nums[mid] > nums[right]` a value larger than the right end sits at `mid`, which is only possible before the pivot, so the minimum lies strictly right of `mid`; when `nums[mid] < nums[right]` the segment `mid..right` is non-decreasing, so the rotation point is at `mid` or to its left and `mid` stays a candidate. The window halves until one index remains, and that element is the minimum.

Duplicates break exactly one link in that chain. When `nums[mid] == nums[right]` the equal run may straddle the pivot — as in `[1,1,1,0,1]` — and neither comparison can tell where the minimum hides, because both halves fit the observed equality. The fix is to pay one element to restore decisiveness: `nums[right]`'s value also appears at `mid`, so discarding index `right` cannot lose the minimum while it strictly shrinks the window, and the loop re-examines the midpoint of the smaller window.

The cost of a shrink is one element rather than half the window, which is the honest answer to the statement's follow-up. Arrays without long equal runs halve at nearly every step and stay `O(log n)`, but an all-equal array shrinks by single elements to the end, degrading to a linear scan — and that is unavoidable, since no algorithm can rule out a smaller value it never examined among identical probes.

**Complexity:** `O(log n)` time on inputs without long equal runs, degrading to `O(n)` when duplicates force repeated shrinks; `O(1)` space.
