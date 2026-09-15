# Solutions — Find K Pairs with Smallest Sums

Both solutions must emit the `k` smallest pairs `(nums1[i], nums2[j])` in
order, ties going to the earlier `nums1` index — the lexicographically
first `k` triples `(sum, i, j)`. Neither materializes the Cartesian
product. One works _around_ it: it never pops anything, but finds the
value of the `k`-th smallest sum directly by binary search on the number
line, counts pairs against each candidate in linear time, and then
harvests the chosen sums by position. The other works _inside_ the
product: it merges the sorted rows of the pair matrix through a min-heap,
discovering the answers one pop at a time.

## Binary Search on the Sum

Ask a different question first: how many pairs sum to at most `s`? Both
arrays are sorted, so one descending pointer into `nums2` answers for all
of `nums1` at once — for each `nums1[i]`, the qualifying `nums2` entries
are a prefix, and as `i` rises the prefix only shortens, so the pointer
walks down once across the whole sweep. That count is monotone in `s`, so
the `k`-th smallest sum is pinned by binary search over the value range
between `nums1[0] + nums2[0]` and the two last elements: the least `s`
whose count reaches `k` is exactly the threshold the `k`-th output carries.
Thirty-odd linear sweeps replace the heap's churn.

Harvesting then reads off positions. Every pair with sum strictly below
the threshold is certainly among the answers, and by the threshold's
minimality there are fewer than `k` of them — collect them with the same
descending pointer, sort by `(sum, i, j)`, and what remains of the quota
is filled from the pairs summing to exactly the threshold, taken in `i`
then `j` order, which is precisely the tie-break the output demands. On
Example 1 the search lands on `5`: the four pairs below it
(`-5, -1, 1, 4`) fill almost everything, and the first equality pair
`(2, 3)` completes the five. Example 2 lands on `1` with only the two
`[0, -2]` below, topping up with both `[0, 1]`s.

The never-materialize rule survives: the harvested lists are bounded by
`k`, the counting sweeps never build a pair, and the search itself runs
over values, not elements. The price is the logarithmic pile of linear
counting sweeps — cheap against sorted arrays — and the wider integer
types, since candidate sums span twice the value range.

**Complexity:** `O((m + n) log(maxSum) + k log k)` time, `O(k)` auxiliary
space.

## Min-heap over candidate pairs

The full cross product of `nums1` and `nums2` can hold 10^10 pairs, so only a frontier of candidates is ever materialized. Since both arrays are sorted, `(nums1[i], nums2[0])` is the smallest pair beginning with `nums1[i]`; the heap is seeded with these row-minima for the first `min(len(nums1), k)` indices (no pair beyond index `k` of `nums1` can be among the `k` smallest, because each already has at least `k` smaller-or-equal pairs ahead of it from earlier rows).

Each pop yields the globally smallest remaining pair, which is appended to the result. When `(i, j)` is consumed, the only unexplored pair that could be its successor within row `i` is `(i, j + 1)` — everything to its left in the row has already been popped, and everything else in the heap belongs to different rows. Pushing that one successor restores the invariant that the heap always contains the minimum un-emitted pair of every active row, so `k` pops produce exactly the `k` smallest pairs in order. The heap tuples `(sum, i, j)` compare by sum first and then by the `nums1` index, which matches the required tie-breaking: equal sums are emitted with the smaller `nums1` index first.

Edge cases: empty inputs or `k <= 0` return an empty list immediately, and the `j + 1 < len(nums2)` guard prevents pushing past the end of a row (the problem guarantees `k` never exceeds the total pair count, so the loop always fills `k` results). Heap size never exceeds its seeding size plus one push per pop, i.e. `O(k)`.

**Complexity:** `O(k log k)` time, `O(k)` space.
