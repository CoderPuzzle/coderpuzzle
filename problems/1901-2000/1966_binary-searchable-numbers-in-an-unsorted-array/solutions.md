# Solutions — Binary Searchable Numbers in an Unsorted Array

Whether a target survives every run of the search function is a purely
local property. When a pivot larger than the target sits to its left, that
pivot discards itself and everything to its right — the target included.
When a pivot smaller than the target sits to its right, that pivot discards
itself and everything to its left — the target again. Any other pivot
leaves the target in the sequence, so the target is guaranteed to be found
exactly when no element to its left is larger than it and no element to its
right is smaller than it.

## Prefix max and suffix min scan

Because every value in `nums` is unique, the two conditions translate into
range comparisons: `nums[i]` must exceed the maximum of everything before
it and stay below the minimum of everything after it. A single backward
pass fills `suffixMin[i]` with the smallest value from `i` onward, then a
forward pass keeps a running prefix maximum while counting positions that
satisfy both sides.

The two passes are flat loops — no recursion and no binary search — so even
the `10⁵`-element arrays the constraints allow are scanned in linear time.
A value at index `0` or `n - 1` trivially passes the side that has no
elements, which is why a single-element array always contributes one
guaranteed value.

**Complexity:** `O(n)` time, `O(n)` space.
