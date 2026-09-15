# Solutions — Minimum Operations to Make Array Elements Zero

Every query hides a counting problem: how many "/4" division steps does the
range `[l, r]` need in total, and how do the two-at-a-time operations split
that work.

## Band sums, halved per operation

An element `x` reaches 0 after exactly `floor(log4(x)) + 1` division steps —
that is `k` steps for every `x` in `[4^(k-1), 4^k)`. One operation applies a
step to two elements at once, so a range whose elements need `S` steps in
total can never finish in fewer than `ceil(S / 2)` operations.

That lower bound is attainable because the range is contiguous and holds at
least two elements: the largest step count `d(r)` satisfies
`S >= d(r-1) + d(r) >= 2*d(r) - 1`, hence `ceil(S / 2) >= d(r)`, so even the
single most demanding element never forces a wasted slot. Pairing the two
elements with the largest remaining step counts each time (the hint's
greedy) realizes the bound, and each query costs `ceil(S / 2)`.

To get `S` without touching up to `10⁹` elements individually, sum per band:
`prefix(v) = Σ k · |[4^(k-1), 4^k) ∩ [1, v]|` needs at most 16 loop
iterations since `4^15 > 10⁹`, and `S = prefix(r) - prefix(l-1)`. Summing
`(S + 1) / 2` over all queries gives the answer. Totals reach roughly
`7.5 × 10¹⁴`, so every language accumulates in 64-bit integers (JavaScript
numbers stay exact below `2^53`).

**Complexity:** `O(m · log₄ R)` time, `O(1)` space.
