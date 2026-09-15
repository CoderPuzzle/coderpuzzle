# Solutions — Find the Punishment Number of an Integer

## Iterative gap-mask backtracking

An integer i qualifies exactly when the decimal string of i * i admits one
choice of cuts whose parts add up to i. A d-digit string has d - 1 interior
gaps, and every way of cutting corresponds to some subset of those gaps, so
the whole search space for one i is walked by counting a bitmask m from 0
through `2^(d-1) - 1`: bit k set means digit k ends a part. The masks
enumerate exactly the partitions a recursive split-and-combine would
generate, but iteratively — the split depth never exceeds 7 because
`i <= 1000` gives `i * i <= 10^6`, seven digits at most.

Each mask is scored left to right: digits accumulate into the current part,
each cut flushes that part into a running sum, and the walk is abandoned the
moment the running sum exceeds i. This prune is safe because every remaining
part is non-negative, so an overshoot can never come back down; a mask that
survives to the last digit wins when its total equals i. Nothing needs a
wider word than 32 bits: parts parse to at most `10^6`, the running sum is
dropped once it passes `i <= 1000`, and the final total is bounded by
`sum(i^2, i = 1..1000) = 333,833,500 < 2^31 - 1` (the actual value at n =
1000 is 10,804,657) — JavaScript doubles stay exact too, far below their
`2^53` integer limit.

Per i the work is one mask scan, O(d · 2^(d-1)) digit steps worst case with
constant extra space; d never exceeds 7, so each i costs under 400 steps.

**Complexity:** `O(n · 2ᵈ)` time, `O(1)` space.
