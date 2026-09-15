# Solutions — Maximum Score Of Spliced Array

## Kadane on each difference array

Swapping `nums1[left...right]` with `nums2[left...right]` moves a contiguous
block of the difference between the two arrays from one side to the other:
`sum(nums1)` changes by exactly the sum of `nums2[i] - nums1[i]` over the
swapped range, and `sum(nums2)` changes by the negated amount. So the best
outcome that ends on the `nums1` side is `sum(nums1)` plus the best range
gain of that difference array, and symmetrically for the `nums2` side — and
the best range gain of a fixed array is the classic maximum-subarray
problem.

The code runs one Kadane sweep per direction over the differences, keeping
only the running best range sum; clamping at zero folds the "not do
anything" option in for free, since a negative best gain simply means the
swap is skipped and the untouched base sum stands. The answer is the larger
of `sum(nums1) + best gain toward nums1` and `sum(nums2) + best gain toward
nums2`. Each direction needs one pass and two scalars, so nothing beyond
the input is stored.

Widening: no total can leave 32-bit range. Each base sum is at most
n · max value = 10⁵ × 10⁴ = 10⁹, a difference element is at most 9999 in
magnitude so every Kadane partial stays within ±10⁹, and even the largest
conceivable score — one array absorbing everything, `sum(nums1) + sum(nums2)`
— tops out at 2 × 10⁹, still below the signed 32-bit ceiling of
2,147,483,647. Python integers are unbounded and JavaScript numbers hold
every integer up to 2⁵³ exactly, so plain 32-bit types carry C++, Go, Java,
and Rust with headroom to spare.

**Complexity:** `O(n)` time, `O(1)` space.
