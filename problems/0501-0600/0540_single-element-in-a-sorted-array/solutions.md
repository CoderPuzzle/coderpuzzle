# Solutions — Single Element in a Sorted Array

## Binary Search on Even Indices

In the array before the single element appears, every pair is intact, so each pair's first occurrence sits at an even index; after the single element, the pairing is shifted by one and every pair starts at an odd index. This parity break is monotone — intact-then-broken, never reverting — which is exactly the invariant binary search needs. The search therefore only ever examines even indices: whenever the midpoint `mid` lands on an odd index it is shifted back by one, so `mid` and `mid + 1` always form a candidate pair starting on an even slot.

The comparison decides which side holds the answer. If `nums[mid] == nums[mid + 1]`, that pair is intact, so the single element must lie strictly to the right and the search moves `lo = mid + 2`; otherwise the pair is already broken (either `mid` is the single element or the break is earlier), so the answer is at `mid` or to its left and `hi = mid`. The bounds close without ever stepping past a valid index: while `lo < hi`, the even-adjusted `mid` stays at most `n - 2`, so `mid + 1` is always in range.

The loop ends when `lo == hi`, and that surviving index is the single element — `hi` only ever settles onto a candidate left behind by a broken pair or by exhaustion of the right side, and a one-element array resolves trivially with the loop never running. The search halves the range each step and keeps only two indices, meeting the logarithmic-time, constant-space requirement without touching the input.

**Complexity:** `O(log n)` time, `O(1)` space.
