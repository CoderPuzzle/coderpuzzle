# Solutions — Find the Integer Added to Array II

## Try the Three Smallest Shifts

Whatever two elements end up removed, adding `x` rigidly shifts every
survivor, so sorted order is preserved under the shift: the kept elements of
`nums1`, plus `x`, must equal `nums2` element-for-element when both are
sorted. In particular the kept minimum lands exactly on `min(nums2)`. The
kept minimum is some `sorted(nums1)[r]` where `r` counts how many elements
smaller than it were removed — with only two removals that is at most 2. So
the entire candidate space for `x` collapses to three values,
`min(nums2) - sorted(nums1)[r]` for `r = 0, 1, 2`.

Each candidate is checked naively, as hint 2 suggests: consume a multiset of
`nums1` against `nums2` by looking up `value - x` for each `nums2` element.
If every lookup succeeds, the remaining unconsumed entries number exactly
two (`|nums1|` minus `|nums2|`), which is precisely a valid removal plan;
any failed lookup rejects the candidate outright. Inputs admit at least one
valid shift by construction, so a scan over the three candidates in any
order always finds something.

Returning the minimum matters: one array can validate under several shifts
(disjoint removal plans), including pairs whose best answer is far smaller
than the first candidate found. All arithmetic stays within
`[-1000, 1000]` for `x` and `[0, 2000]` for shifted comparisons — no
overflow in any integer width — and everything runs in linear scans after
one sort.

**Complexity:** `O(n log n)` time, `O(n)` space.
