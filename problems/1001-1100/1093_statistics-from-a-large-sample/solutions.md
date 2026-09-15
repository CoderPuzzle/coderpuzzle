# Solutions — Statistics from a Large Sample

## One pass over the count array, with a k-th helper for the median

Because the sample is stored as a per-value count rather than an
expanded list, every statistic falls out of a single left-to-right walk
over the `256` buckets. The minimum is the first bucket with a nonzero
count and the maximum the last; the mode is the bucket with the largest
count. The mean needs the total element count and the total value sum,
`sum(k * count[k])` — both accumulated in 64-bit integers, since `count`
values can reach `10⁹` and the weighted sum exceeds the 32-bit range.

The median is the only statistic that needs position. A `k-th` helper
walks the same buckets accumulating the running element count and
returns the value where the running count first reaches `k`. For an odd
sample size the median is the single middle element; for an even size it
is the average of the two middle elements, obtained with two calls to
the helper. All five numbers are returned as floating point, with the
mean and median the only non-integer values possible.

**Complexity:** `O(256)` time and `O(1)` space — the count array has a
fixed length, so the work is constant regardless of the sample size.
