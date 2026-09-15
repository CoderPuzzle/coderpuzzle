# Solutions — Minimum Operations to Make Array Non Decreasing

## Sum every downward step

Whenever `nums[i] > nums[i + 1]`, their difference must be paid by operations
whose chosen subarray starts at `i + 1`: operations that cover both positions
do not change this boundary. Conversely, adding exactly that difference to
the suffix beginning at `i + 1` fixes the drop without disturbing any earlier
boundary. Repeating this for every drop constructs a non-decreasing array.

Therefore each downward adjacent difference is both an unavoidable lower
bound and independently achievable, so their sum is optimal. The sum can
reach roughly `10¹⁴`; fixed-width languages use 64-bit integers, while that
bound remains exact in JavaScript numbers.

**Complexity:** `O(n)` time, `O(1)` space.
