# Solutions — Minimum Absolute Sum Difference

The baseline sum of absolute differences is computable in one pass and cannot
be touched except through a single replacement, so the whole problem is: which
index, fed which value from `nums1`, saves the most?

## Sort `nums1` once, binary-search the closest replacement

Fix an index `i`. Replacing `nums1[i]` by any `x` from `nums1` changes the
sum by `|nums1[i] - nums2[i]| - |x - nums2[i]|`, which is maximized by the `x`
nearest to `nums2[i]` — and a sorted copy of `nums1` answers "nearest value"
with one binary search: the two neighbors of `nums2[i]` in the sorted order
bracket every candidate, so checking both suffices. Sorting once up front and
reusing that copy for every index turns n searches into `O(n log n)` total.

Walk the arrays accumulating `total += |nums1[i] - nums2[i]|` while tracking
`best_gain`, the largest `diff - nearest` seen. Note `nums1[i]` itself is in
the sorted copy, so `nearest <= diff` always holds — the best gain is never
negative, which is exactly the "at most one element" freedom: when nothing
helps, `best_gain` stays 0 and the original sum is returned untouched. The
final answer is `(total - best_gain) % (10⁹ + 7)`.

One bound shapes the typing: `total` reaches `10⁵ · 10⁵ = 10¹⁰`, beyond the
32-bit range, so the fixed-width languages accumulate in 64-bit integers and
narrow only after the modulo; JavaScript's `Number` is exact below 2⁵³ and
10¹⁰ sits far under it, so plain arithmetic suffices there.

**Complexity:** `O(n log n)` time, `O(n)` space.
