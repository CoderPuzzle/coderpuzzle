# Solutions — Final Element After Subarray Deletions

## End the game at an endpoint

A move may delete any contiguous subarray strictly shorter than the current
array, so the mover can always delete a block of length `m - 1` and end the
game on the spot. What such a finishing move cannot do is spare an interior
element: the deleted block is contiguous, so the lone survivor must be the
prefix of length 1 or the suffix of length 1 — an endpoint of the current
array.

Alice opens by deleting everything except the larger endpoint of `nums`, and
the game ends at `max(nums[0], nums[n - 1])`. No other opening does better:
one deletion leaves a prefix and a suffix of the original array, so at least
one end of the remainder is an original endpoint; if anything else survives,
Bob deletes all but the smaller end of the remainder — again a length
`m - 1` deletion — and that value never exceeds the larger original
endpoint. Interior elements are unreachable for Alice: isolating one takes
deletions on both of its sides, and Bob is the one who moves on the longer
arrays.

The method therefore reads exactly two cells and compares them. Values are
bounded by `10⁵`, far inside the 32-bit range of every fixed-width language
here, and trivially exact as JavaScript numbers; the flow is a single
comparison with no loops and no recursion.

**Complexity:** `O(1)` time, `O(1)` space.
