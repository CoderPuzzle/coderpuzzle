# Solutions — Search in Rotated Sorted Array II

## Modified binary search with an ambiguity shrink

A rotated sorted array is still sorted on one side of any midpoint, so the classic reasoning survives the rotation: compare `nums[lo]` with `nums[mid]`, and whichever half that comparison proves sorted is searched or discarded by one range check against `target`. Duplicates break exactly one link in that chain. When `nums[lo] == nums[mid] == nums[hi]`, the equal run may straddle the pivot — as in `[1,1,1,0,1]` — and the comparison cannot tell which half is sorted, because either half fits the observed equalities.

The fix is to pay one element to restore decisiveness. Since `nums[mid] != target` was already established, `nums[lo]`, being equal to `nums[mid]`, is not the target either, so discarding index `lo` cannot lose the answer while it strictly shrinks the window; the loop then re-examines the midpoint of the smaller window. Once the ambiguity is gone, the argument runs as before: `nums[lo] <= nums[mid]` proves the left half sorted (a pivot strictly inside it would force `nums[lo] > nums[mid]` unless all three probes agree), so `nums[lo] <= target < nums[mid]` sends the search left and everything else right, with the mirror branch covering the `nums[lo] > nums[mid]` case where the right half must be the sorted one.

The cost of a shrink is one element rather than half the window, which is the honest answer to the statement's follow-up. Arrays without long equal runs halve at nearly every step and stay `O(log n)`, but an array like `[2,2,2,3,2,2,2]` shrinks by single elements through its equal runs, and an all-equal array degenerates to a linear scan — `O(n)` is unavoidable in the worst case, since any algorithm must distinguish where the run of values unlike `target` hides. The empty window returns `false`.

**Complexity:** `O(log n)` time on average, degrading to `O(n)` when long runs of equal values force repeated shrinks; `O(1)` space.
