# Solutions — Design an Array Statistics Tracker

## Queues, Heaps, and Frequency Counts

Each statistic gets a structure it can maintain incrementally. The mean
comes from a running sum over the values, adjusted by each add and
remove. The median comes from two heaps that split the live values into
a lower half (a max-heap) and an upper half (a min-heap), sized so the
lower half holds `ceil(n/2)` elements — the median is then always at a
top: the lower half's maximum for odd counts, and the upper half's
minimum for even counts, which is exactly the larger of the two middles.
The mode comes from a heap of `(count, value)` entries ordered by count
descending, value ascending; because a value's count only ever moves
through consecutive levels, an entry exists for the current count of
every live value, and stale entries are skipped when they surface.

Removals are FIFO, so the departing value is arbitrary from a heap's
point of view. Rather than searching, an erased value is marked in a
delayed counter and discarded when it surfaces at a heap top — pruning
runs before every read and every inter-heap move. Rebalancing counts
only live entries: the erasure charges the ghost to the half its value
belongs to, and fungible duplicates stay consistent because any copy
popped from a top while its delayed count is positive is equally a
valid one to drop. The mode heap skips its stale entries the same lazy
way.

The mean is `floored(sum / count)`. Sums reach `10⁵ · 10⁹ = 10¹⁴`, past
32-bit range but below `2⁵³`, so fixed-width languages hold the sum in
64-bit integers and JavaScript plain numbers stay exact. Every call
touches a constant number of heap operations of depth `O(log n)`.

**Complexity:** `O(log n)` amortized per call, `O(n)` space.
