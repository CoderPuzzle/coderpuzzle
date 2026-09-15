# Solutions — Find the Integer Added to Array I

## Difference of Minima

Adding one constant `x` to every element of `nums1` shifts the whole set of
values rigidly, so whatever holds for one element holds for every element —
including the minimum. The smallest value of `nums1` must land exactly on
the smallest value of `nums2` (otherwise no shift could align the multisets
at all), which pins `x = min(nums2) - min(nums1)` immediately: scan both
arrays once tracking the two minima and return their difference.

Nothing else is needed. The statement's guarantee says some valid `x`
exists, and such an `x` is unique whenever it exists — if two shifts `x`
and `x'` both turned `nums1` into `nums2`, then shifting the multiset
`nums1 + x` by `x - x'` would map it onto itself, which forces `x = x'`
unless `nums1` is constant; a constant `nums1` makes both arrays constant
and again only one `x` works. So the min-derived shift is not just a good
candidate, it is the answer, in `[−1000, 1000]`, comfortably inside 32-bit
range.

**Complexity:** `O(n)` time, `O(1)` space.
