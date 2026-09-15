# Solutions — Count Good Triplets in an Array

Both methods pin the count on the middle value `y`: a triplet survives
both arrays exactly when its middle has some number of common
predecessors before it and common successors after it, so each `y`
contributes the product of the two counts and the answer sums over `y`.
The Fenwick tree gathers the counts online, sweeping `nums1` and
prefix-querying a small order-statistics structure at every value it
passes. The merge sort gathers them wholesale — the divide-and-conquer
that orders the positions already compares every cross-half pair, and
the tallies ride along with the sorting work.

## Fenwick Tree over Positions with the Middle Element

A good triplet is increasing by position in both permutations at once. Relabel each value by its index in `nums2`, and the condition becomes: a triplet of values is good when their `nums1` order and their `nums2` order agree, i.e. they form a common increasing subsequence of the two permutations. Counting these is the classic 3-way inversion pattern: fix the middle element `y` and multiply the number of valid predecessors by the number of valid successors.

The solution iterates the values in `nums1` order, keeping a Fenwick (BIT) tree indexed by `nums2` position that records the values already processed. When value `y` arrives at `nums2` position `p` after `i` earlier values in the `nums1` sweep, `prefix_sum(p − 1)` gives `left` — how many of those earlier values also precede `y` in `nums2`. Of the `i` processed values, `i − left` of them lie after `y` in `nums2`; since every value after `y` in `nums2` totals `n − 1 − p`, the count of values that follow `y` in both orders is `right = (n − 1 − p) − (i − left)`. Each such value pairs `y` into `left · right` triplets, after which `y` itself is inserted into the tree.

Every triplet is counted exactly once, at its middle element. Each of the `n` iterations does two Fenwick operations of cost O(log n), and the tree plus the position table are the only auxiliary storage.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Merge-sort dominance counting

Every count the Fenwick sweep computes is a dominance count — a pair of
values whose order agrees in both arrays — and a merge sort compares
exactly those pairs on its way to sorting. Reduce first: replace each
`nums1[i]` by its position in `nums2`, so the input becomes one array
`a` with `a[i] < a[j]` saying that the values at `i` and `j` read in the
same order in both arrays. The middle-value split then asks, per index
`i`, for two of these counts at once: earlier indexes carrying smaller
positions (common predecessors) and later indexes carrying larger ones
(common successors).

The merge delivers one tally, `smaller_after[i]` — later indexes with
smaller positions. Whenever a merge places an element of the left half,
the right-half elements already placed are all smaller (the merge
outputs ascending) and, the halves being index ranges, all later, so the
element picks up the count of right-half placements so far. Every pair
of indexes meets at exactly one recursion level — the one whose split
separates them — so after the sort `smaller_after[i]` holds exactly the
later-and-smaller count, and both factors follow by subtraction: `a[i]`
positions in all are smaller than `a[i]`, so common predecessors number
`a[i] - smaller_after[i]`; `n - 1 - i` indexes in all are later, so
common successors number `(n - 1 - i) - smaller_after[i]`. One final
pass over the indexes multiplies and sums.

Walking the six-value example again, `nums1 = [0,5,2,4,1,3]` against
`nums2 = [2,0,4,1,5,3]`: the reduction gives `a = [1,4,0,2,3,5]`, and
the tallies left behind read `smaller_after = [1,3,0,0,0,0]` — only the
values 0 and 5 are ever overtaken by a later value. The value 4 then
reads `left = 2`, `right = 2`, contributing 4; the value 5 and the value
1 contribute `1 × 1` and `3 × 1`; the total is again 8. The sort performs
its `O(n log n)` comparisons regardless, so the tallying is bookkeeping
on work already done, and the workspace plus the position and count
arrays are the only storage.

**Complexity:** `O(n log n)` time, `O(n)` space.
