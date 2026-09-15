# Solutions — Find K-th Smallest Pair Distance

## Binary Search on the Answer

The number of pairs with distance at most `x` is monotone non-decreasing in `x`, which makes the answer itself binary-searchable over the range `[0, max - min]` of possible distances. The search keeps the invariant that the answer lies in `[lo, hi]`: if at least `k` pairs have distance `<= mid`, the k-th smallest is `mid` or smaller, so shrink `hi`; otherwise it is strictly larger, so raise `lo`. The loop converges on the smallest distance whose qualifying count reaches `k`.

That converged value is always an actual pair distance: just below it fewer than `k` pairs qualify, at it at least `k` do, and the count function only jumps at distances that really occur between pairs — duplicates in the array make distance 0 a jump point too, covered by the `lo = 0` starting bound.

The counting predicate runs in linear time on the sorted array with two pointers. For each index `i`, the pointer `j` advances while `nums[j] - nums[i] <= dist`, and `j - i - 1` counts every later element within `dist` of `nums[i]`. Because the array is sorted, `j` only ever moves forward across the whole scan — it never restarts for a new `i`, and it is always at least `i + 1` since `nums[i]` itself is within any non-negative distance. With `D` the spread `max - min`, the sort costs `O(n log n)` and the search performs `O(log D)` linear counting passes.

**Complexity:** `O(n log n + n log D)` time, `O(n)` space.
