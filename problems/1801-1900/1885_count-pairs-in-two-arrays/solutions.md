# Solutions — Count Pairs in Two Arrays

The condition `nums1[i] + nums1[j] > nums2[i] + nums2[j]` rearranges to
`d[i] + d[j] > 0` where `d[k] = nums1[k] - nums2[k]` — a single array
and one inequality, which sorting turns into counting.

## Sort differences, two-pointer count

Sort the difference array ascending. Sweep with two pointers from both
ends: while the smallest remaining `d[l]` paired with the largest
remaining `d[r]` still sums positive, every element strictly between
them also pairs positively with `d[r]` (they are all at least as large
as `d[l]`), so add `r - l` and step `r` down; otherwise step `l` up.
Each element leaves exactly once, giving the full count of pairs with
positive sum.

The maximum possible answer is C(10^5, 2) ≈ 5 * 10^9, which overflows
32 bits — the 64-bit return type carries it. Differences fit easily in
32-bit intermediates (`|d| < 10^5`) but are widened on accumulation.

**Complexity:** `O(n log n)` time for the sort, `O(n)` space (or `O(1)`
extra when sorting in place).
