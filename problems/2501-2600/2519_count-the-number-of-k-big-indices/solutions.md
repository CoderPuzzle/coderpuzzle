# Solutions — Count the Number of K-Big Indices

Both approaches reduce the verdict to two per-position tallies — how many
strictly smaller values sit to the left, how many to the right — and count
a position only when both reach `k`. Merge-sort counting earns its tallies
wholesale: as the sort's halves merge, each left-half placement is credited
the right-half values already placed below it, and each right-half
placement reads its strictly smaller left-half predecessors off the
sorted run. The Fenwick sweeps answer the same questions online instead:
two value-indexed walks, one from each end, query the prefix of everything
strictly below the current value before inserting it.

## Merge-sort counting for left and right smaller-counts

Every count the verdict needs couples two positions — one earlier, one
later — so halving the array is itself the bookkeeping device: pairs
living entirely inside one half are the recursion's business, and the
cross pairs between the two sorted runs are the only ones needing direct
attention. The sort carries positions, not bare values, because each
tally lands on a specific original index. Every cross pair is weighed at
exactly the one merge whose split separates it — never before, never
again — so when the sort ends, both per-position counts are complete.

The tally rides on the merge cursor. When a left-half element is placed,
every right-half element already written out is strictly smaller — the
comparison is `<=`, so on equal values the left element places first and
its equal twin is never counted — and one credit of the right-half
placements so far covers them all. When a right-half element is placed,
a second pointer crawls up the sorted left run and stops at the first
value not below it; everything it passed is strictly smaller and lands
in that element's left count. The crawl never restarts — the next
right-half element is at least as large — so each merge stays linear.

What remains is arithmetic: a position is counted when both of its
stored tallies reach `k`, mirroring the sweep version's final pass.
Recursion depth is the sort's height — about seventeen frames at
`n = 10⁵` — and the left-run copies plus the position workspace are the
only extra storage; counts are bounded by the array length, comfortably
inside every language's exact integer range.

**Complexity:** `O(n log n)` time for a linear merge at each of the
sort's `log n` levels, `O(n)` space for the index workspace, the left-run
copies, and the two per-position count arrays.

## Two Fenwick sweeps for left and right smaller-counts

Index `i` is k-big precisely when two independent quantities clear the
bar: the number of strictly smaller values to its left, and the number
to its right. Either quantity is answered online by a Fenwick tree
indexed by value — walk the array once, and before inserting `nums[i]`,
query the prefix sum of everything below it, which is exactly its count
of strictly smaller predecessors.

The right side is the same computation on the reversed array: rerun the
sweep on a fresh tree over reversed order and read the results mirrored.
An index is counted when both of its stored counts reach `k`; equal
values never contribute anywhere because only strict "smaller" prefixes
are ever summed.

Every query and update touches `O(log V)` tree nodes with `V` the value
bound (here at most `n`), and counts are bounded by the array length,
comfortably inside every language's exact integer range.

**Complexity:** `O(n log n)` time across the two sweeps plus a linear
tally, `O(n)` space for the trees and the per-index count arrays.
