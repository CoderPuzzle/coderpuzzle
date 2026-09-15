# Solutions — Maximum Distance Between a Pair of Values

Both arrays are non-increasing, so the reachable frontier only moves one
way: when `i` grows and `nums1[i]` can only shrink, every index that was
a valid partner for `i - 1` remains valid for `i`. The farthest usable
`j` is therefore monotone in `i`, which is exactly what a shared pointer
needs.

## Shared advancing pointer over both arrays

Walk `i` through `nums1`, advancing a single `j` while it is behind `i`
or while `nums2[j]` still satisfies `nums2[j] >= nums1[i]`; after the
loop, `j - 1` is the farthest index with `nums2[j-1] >= nums1[i]` (or
the search ran off the array). When a usable partner exists — `j > i`
and the last accepted value still dominates — record `j - 1 - i`.
Because each of `i` and `j` only ever moves forward, the whole sweep is
linear despite the pairwise nature of the question.

**Complexity:** `O(n1 + n2)` time, `O(1)` space.
