# Solutions — Minimum Adjacent Swaps to Alternate Parity

## Ordered even-slot matching over both patterns

Only parity matters, and a target is one of at most two alternating
patterns: evens on even indices, or evens on odd indices. Feasibility is
pure counting — a pattern exists only when `|evenCnt - oddCnt| <= 1`,
and for odd `n` the majority parity is forced into the `0` slot. In any
feasible pattern the `j`-th even element (in current order) must land on
the `j`-th even slot: if two same-parity elements crossed, swapping
their assignments removes that crossing without disturbing anything
else, so an optimal assignment preserves order.

With the assignment fixed, each adjacent swap transposes one even with
one odd and moves exactly one even element by one position, so the
number of swaps needed for a pattern equals the sum of
`|current index - target slot|` over the even elements (the odd elements
mirror them exactly — every swap displaces one of each). The answer is
the smaller of the two pattern costs. All arithmetic is a sum of
non-negative displacements, bounded by `n²/8 + n < 1.3 * 10⁹` at
`n = 10⁵` (evens packed at one end against interlaced slots); that fits
a 32-bit integer, and 64-bit accumulators give headroom everywhere.

**Complexity:** `O(n)` time, `O(n)` space (the even-index list; `O(1)`
beyond it).
