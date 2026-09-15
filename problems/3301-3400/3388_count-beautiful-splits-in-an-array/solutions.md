# Solutions — Count Beautiful Splits in an Array

## Suffix LCP Table with Boundary-Case Split Enumeration

A split is determined by the two cut points: `nums1 = nums[0:i]`, `nums2 = nums[i:j]`, `nums3 = nums[j:n]` with `1 ≤ i < j < n`. Both beauty conditions are prefix-of relations between adjacent pieces, and any such relation reduces to one comparison: `A` is a prefix of `B` iff the longest common prefix of the two suffixes starting at `A`'s and `B`'s offsets is at least `len(A)`. So precompute `lcp[i][j]` = the longest common prefix of suffixes `nums[i:]` and `nums[j:]` with the recurrence "match at the heads, then take `lcp[i+1][j+1]`", filled from the bottom-right corner in `O(n²)` time and stored in `unsigned short` rows to keep memory near `2 · n²` bytes.

With the table in hand, case A is cheap: if `nums1` is a prefix of `nums2` (`lcp[0][i] ≥ i`), then every cut `j ≥ 2i` is beautiful — `nums2` is long enough to contain the copy of `nums1` and any remainder plus `nums3` works — contributing `n - 2i` splits at once, provided `2i ≤ n - 1` keeps `nums3` non-empty. The scan for case B (`nums2` a prefix of `nums3`, checked as `lcp[i][j] ≥ j - i` with `nums3` long enough) then only visits the `j` in `(i, 2i)` not already covered by case A, avoiding double counting a split that satisfies both conditions.

The LCP table must be built for all pairs, not just the ones queried, because the queried offsets depend on the enumeration; but every query afterwards is `O(1)`, so the counting phase is bounded by the `O(n²)` total range it scans.

Edge cases: arrays shorter than 3 admit no split; equal adjacent values make many offsets share long common prefixes, which the table handles uniformly; the strict `j < n` bound ensures `nums3` is non-empty everywhere.

**Complexity:** `O(n²)` time, `O(n²)` space.
