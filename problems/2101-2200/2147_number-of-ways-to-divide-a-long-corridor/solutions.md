# Solutions — Number of Ways to Divide a Long Corridor

A valid section holds exactly two seats, and sections cover the corridor in
order, so the seats pair up as they appear: the first two seats form the first
section, the next two the second, and so on.

## Forced dividers between seat pairs

Between two adjacent sections exactly one divider must stand: skipping it would
merge two seat pairs into a four-seat section, and installing two would strand a
pair of sections that cannot each reach two seats. That lone divider may occupy
any of the `k + 1` positions inside the `k`-plant gap separating the second seat
of one pair from the first seat of the next. The choices are independent across
gaps, so the answer is the product of `plants + 1` over all inter-pair gaps,
taken modulo `10⁹ + 7` — or `0` when the seat total is odd (or zero), since
then some section is doomed to miss its second seat.

A single pass implements this directly. It counts seats and, once the first
pair is complete, accumulates the plants that follow; on the seat that opens a
new pair it multiplies the running product by `plants + 1` and clears the gap
counter. Plants before the first seat or after the last belong to no gap, so
counting starts only at two seats. Every multiplier is at most
`10⁵ + 1 < 2¹⁷` while the reduced product stays below `2³⁰`, so even
double-precision JavaScript multiplies exactly; the fixed-width languages carry
the product in a 64-bit accumulator.

**Complexity:** `O(n)` time, `O(1)` extra space.
