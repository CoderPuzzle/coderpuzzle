# Solutions — Minimum Difference in Sums After Removal of Elements

## Two Heaps over Prefix and Suffix Selections

For the difference `sumfirst − sumsecond` to be minimal, the first part should use the smallest available values and the second part the largest. If the first part takes `n` elements from `nums[0..i]` and the second takes `n` from `nums[i+1..]`, the remaining `n` elements — those between the two selections — are exactly the removals. So every candidate solution corresponds to a split point `i` (ranging from `n − 1` to `2n − 1` so both sides have at least `n` elements), paired with the minimum n-element sum on the left and the maximum n-element sum on the right, and the answer is the minimum of `left_min[i] − right_max[i+1]` over all splits.

The solution computes both tables with bounded heaps in one pass each. Sweeping left to right, a max-heap (via negatives) of size `n` keeps the `n` smallest values seen so far along with their running sum; once `n` elements are in, `left_min[i]` records that sum. Sweeping right to left, a min-heap of size `n` keeps the `n` largest values of the suffix starting at `i`, giving `right_max[i]`. Pushing, then evicting the extreme element whenever the heap exceeds `n`, maintains the selections incrementally so each element costs O(log n).

A final linear scan combines the two arrays at every admissible split. The heaps never hold more than `n + 1` elements and the tables hold one entry per index.

**Complexity:** `O(n log n)` time, `O(n)` space, where the array has `3n` elements.
