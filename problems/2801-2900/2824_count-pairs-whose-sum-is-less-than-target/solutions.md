# Solutions — Count Pairs Whose Sum is Less than Target

## Sort, then sweep a two-pointer window

A pair is identified by its two distinct indices and nothing about the
statement depends on order, so sorting a copy of nums cannot change which
pairs qualify. After sorting, put one pointer at each end. If the two
pointed values already sum to less than target, then values[hi] is the
largest partner available for values[lo] and every element between the
pointers pairs with lo too — all hi - lo pairs are counted at once and lo
advances. Otherwise even the largest partner fails lo, so no partner can
pair with lo and hi retreats to look for smaller ones. Each step moves a
pointer inward exactly once, so the window closes after n - 1 steps.

The alternative that ignores the hint's allowance is the literal O(n²)
double loop over index pairs; it reads straight off the statement but does
n·(n-1)/2 comparisons where the sweep does O(n log n) sorting work plus a
linear window pass. Values lie in [-50, 50], so every pair sum and the
final count (at most C(50, 2) = 1225) fit comfortably in a signed 32-bit
integer.

**Complexity:** `O(n log n)` time, `O(n)` space — the copy handed to the
sort (in-place sorts drop it to the sort's own stack).
