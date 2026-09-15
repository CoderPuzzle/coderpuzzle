# Solutions — Median of Two Sorted Arrays

## Binary search on the partition

The median is the boundary of a split of the merged array into a left half and a right half. Instead of merging, pick how many elements `nums1` contributes to the left half — a cut after `i` elements — and the cut in `nums2` is then forced by the half's size: `j = half - i`, where `half = (m + n) // 2`. So the whole problem reduces to finding one integer `i`, which is a binary search. The code first swaps the arrays so `nums1` is the shorter; this both makes the search space smaller and guarantees `j` always lands inside `[0, n]`.

A cut pair `(i, j)` is correct exactly when everything on the left is less than or equal to everything on the right, and because both arrays are sorted it suffices to compare across the cut: `a_left <= b_right` and `b_left <= a_right`, where `a_left`/`a_right` are the elements flanking the cut in `nums1` and `b_left`/`b_right` flank it in `nums2`. Sentinels make edge cuts well-defined: `float("-inf")` stands in for the left neighbour when a cut sits at index 0, and `float("inf")` when it sits past the last element, so cuts that take zero or all elements of an array need no special casing. If `a_left > b_right`, `nums1` is contributing too many elements and `hi` drops to `i - 1`; otherwise it is contributing too few and `lo` rises to `i + 1`.

![The cut after i = 1 element of nums1 and j = 0 elements of nums2 puts 1 on the left and {2, 3} on the right; the cross checks pass and the median is min(3, 2) = 2.](figures/solution-partition-cut.svg)

Once a valid partition is found, the median is read straight off the boundary. With an odd total the left half was made the smaller side, so the median is the smallest element of the right half, `min(a_right, b_right)`. With an even total it is the average of the largest element on the left, `max(a_left, b_left)`, and the smallest on the right, `min(a_right, b_right)`. An empty shorter array also works: the loop immediately tests `i = 0` and the sentinels reduce the answer to `nums2`'s own median.

**Complexity:** `O(log(min(m, n)))` time, `O(1)` space.
