# Solutions — Maximize Happiness of Selected Children

## Sort descending, subtract the turn index

The queue order is a red herring: all that matters is which `k` children are
picked and in which turn, because a child picked in turn `i` (0-based) has
lost exactly `i` points by then. Since happiness only shrinks while a child
waits and never drops below zero, the contribution of the child picked in
turn `i` is `max(0, value - i)`.

An exchange argument shows the optimal schedule takes the `k` largest values
in descending order: swapping any pair so that the larger value is picked
earlier never decreases the sum, because the larger value loses less from
being moved up than the smaller one gains from being delayed. Sorting
`happiness` in descending order and summing `max(0, happiness[i] - i)` over
the first `k` entries therefore gives the answer.

The sum is bounded by `2 * 10⁵` values of at most `10⁸`, i.e. `2 * 10¹³` —
beyond 32-bit range, so the accumulators are 64-bit in every language.
JavaScript numbers hold integers exactly below `2⁵³ ≈ 9 * 10¹⁵`, comfortably
above this bound.

**Complexity:** `O(n log n)` time, `O(1)` auxiliary space (the sort reorders
`happiness` in place).
