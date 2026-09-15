# Solutions — Minimum Inversion Count in Subarrays of Fixed Length

Both approaches live off the same sliding fact: neighboring windows share
`k - 1` elements, so a slide changes the inversion count by exactly two
local terms. The element leaving at the front was paired with every smaller
element that stays behind — subtract that many. The element entering at the
back is paired with every larger element already inside — add that many.
Everything reduces to answering, against a set that loses and gains one
element per step, "how many members are smaller/greater than x?" The two
approaches differ only in the data structure that answers it.

## Sorted Window

Keep the current window itself as a sorted list. Then each rank question is
a binary search whose answer falls out of the position: the index an
element occupies counts how many members are smaller than it, and the gap
it drops into counts how many are greater. Removing the outgoing element
subtracts its search position; inserting the incoming one at its gap adds
`window size after removal - gap`. No compression, no tree — the window
stays materialized in sorted order, which makes both terms readable
straight off two bisections per slide.

Equal values are the precision point. Removal searches for the leftmost
copy so exactly one instance departs; insertion lands the newcomer after
its equals (rightmost gap) so it pairs only with strictly greater
survivors. Get either end wrong by one copy and every later count drifts.
The cost model is honest about the trade: each slide shifts O(k) elements,
so the worst case with k near n is quadratic element moves — but the moves
are contiguous, cache-friendly, and mid-size windows run fast in practice.
The running total reaches `k * (k - 1) / 2`, past 32-bit range once the
window grows beyond ~65535 elements, so fixed-width languages accumulate
in 64 bits; JavaScript numbers stay exact far past that bound.

**Complexity:** `O(n log k)` time, `O(k)` space.

## Fenwick Tree over Compressed Values

Compress all values to their ranks `1..m` (`m <= n`) and maintain a Fenwick
tree counting how many current-window elements sit at each rank. Now both
rank questions are prefix sums: elements smaller than y form the prefix
below its rank, elements greater than x are the window's remaining count
minus the prefix through x's rank. Each query and each membership update
touches O(log m) tree cells, so a slide costs a constant number of such
walks and the whole sweep is `O(n log n)` regardless of how large k grows —
the asymptotic win over shifting a materialized window.

Order of operations inside a slide is load-bearing. Remove the outgoing
element from the tree first, subtracting its smaller companions; then
insert the newcomer, adding its strictly larger companions among the `k -
1` survivors. Querying the insertion term before the removal would let the
departing element contaminate the count whenever the two values are equal
or comparable, silently double-counting. Comparisons stay strict on both
ends — equal neighbors are not inversions — and the accumulator widens to
64 bits for the same reason as above: `k * (k - 1) / 2` outgrows 32 bits
for windows past ~65535 elements.

**Complexity:** `O(n log n)` time, `O(n)` space.
