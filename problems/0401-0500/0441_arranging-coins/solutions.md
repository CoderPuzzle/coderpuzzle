# Solutions — Arranging Coins

## Binary search on the triangular boundary

A staircase with `k` complete rows is a triangular number in coin form: the
rows cost `1 + 2 + ... + k = k(k+1)/2` coins, so the answer for `n` is the
largest `k` whose triangular total `T(k)` still fits inside `n` — once that
budget is met, the leftover `n - T(k)` coins are fewer than the `k + 1` the
next row demands, and the staircase stops incomplete. Both examples sit astride
such a boundary: `n = 5` completes rows 1 and 2 with 3 coins but cannot close
row 3, which needs 6, and `n = 8` completes row 3 with 6 coins but not row 4,
which needs 10.

Inverting `T(k) = k(k+1)/2` algebraically gives the closed form
`k = floor((sqrt(8n + 1) - 1) / 2)`, but a floating-point evaluation of it can
round to the wrong side of a boundary: near the domain ceiling `8n + 1`
approaches `1.7 × 10¹⁰`, and a double-precision square root landing within an
ulp of the odd integer `2k + 1` pushes the `floor` across the break. Binary
search sidesteps the hazard altogether. `T` is strictly increasing, so the
predicate `T(mid) <= n` is monotone in `mid`, and a search over `[1, n]`
decides every step with an exact integer comparison; when the interval closes,
`hi` holds the largest row count that fits.

The one care point is the intermediate. The first probes multiply two numbers
near `n/2`, so `mid * (mid + 1)` peaks around `1.2 × 10¹⁸` — far past 32-bit
range — and the fixed-width languages compute the product in 64 bits, where it
stays comfortably below `2⁶³`. In JavaScript's doubles the early probes lose
their low bits, but those products sit some `10¹⁷` above `n` and the
comparison cannot flip; every comparison the answer turns on happens with
`mid` at most 65536, where `mid * (mid + 1)` is below `2³³` and exact in every
language. The whole search is a few dozen probes no matter how large `n` is.

**Complexity:** `O(log n)` time, `O(1)` space.
