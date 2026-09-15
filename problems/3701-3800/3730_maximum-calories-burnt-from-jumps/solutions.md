# Solutions — Maximum Calories Burnt from Jumps

## Extremes onto alternating indices

Only the multiset of heights matters — the visiting order is entirely ours
to choose — so sort the array first. In the scored sequence, every internal
edge couples one even index with one odd index, and the ground bonus lands
on index 0. That slot structure makes the greedy placement forced: put the
largest ceil(n / 2) values on the even indices in non-increasing order and
the smallest floor(n / 2) values on the odd indices in non-decreasing
order. Squared differences are convex, so interleaving the extremes is what
stretches every edge across the widest available gap — parking two tall
blocks side by side wastes a step that could have descended onto a short
one. Starting at the very largest value also claims the biggest ground
bonus `heights[i]²`, which is why the large half walks the even indices
from the front rather than behind.

Building that arrangement takes one pass with two pointers over the sorted
array — the back pointer feeds the even indices, the front pointer feeds
the odd ones — and a second pass scores it: the first block's square plus
each adjacent gap squared. The degenerate shapes come out right for free:
a single block contributes only its own square, an all-equal array pays
nothing beyond the first jump, and strictly monotonic inputs simply split
into the high and low halves at the median.

Width is the real trap: a single squared gap reaches (10⁵ − 1)² ≈ 10¹⁰,
and with n up to 10⁵ the total climbs toward 10¹⁵ — half the blocks at
height 1 and half at height 10⁵ gets within a factor of nine of that — far
past 32-bit range, so fixed-width languages must widen to 64-bit before
squaring and accumulate in a 64-bit return. The worst case still stays
below 2⁵³, so plain JavaScript and TypeScript numbers remain exact and no
BigInt is needed.

**Complexity:** `O(n log n)` time, `O(n)` space.
