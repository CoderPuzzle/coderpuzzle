# Solutions — Minimum Number of Flips to Make Binary Grid Palindromic II

## Price the symmetry orbits, then settle the count of 1s modulo 4

Reflecting any cell through the horizontal and vertical midlines splits the
grid into orbits whose members are forced to end equal: a full quadruple
`(i, j)`, `(m - 1 - i, j)`, `(i, n - 1 - j)`, `(m - 1 - i, n - 1 - j)`
whenever neither index is a middle one, a mirror pair along the middle row
or middle column when that dimension is odd, and — when both dimensions are
odd — the center cell all by itself. Pricing each orbit at its cheaper final
value is local: a quadruple holding `k` ones costs `min(k, 4 - k)` flips, a
pair holding `c` ones costs `min(c, 2 - c)`.

The divisibility clause couples the orbits, but only through their sizes: a
finished quadruple holds a multiple of four 1s whatever value it takes, a
finished pair holds exactly two, the center exactly one. So the modulo-4
condition reads `2t + z = 0 (mod 4)` over the pairs parked at 1 (`t`) and
the center bit (`z`). Because `2t + 1` is odd, a grid with a center can
never keep it at 1 — the center always clears to 0 — and `t` must be even.
A pair holding one `1` and one `0` switches between its two equal-cost
states for free and absorbs any parity request; when no such split pair
exists and the cheap assignment parks an odd number of pairs at 1,
re-tuning any one uniform pair to its dearer value adds exactly `2`.

One sweep over the top-left quadrant prices every orbit while two short
passes handle the middle row/column pairs and the center, keeping only a
handful of counters. The answer never exceeds the cell count, so with
`m * n <= 2 * 10⁵` it fits comfortably in a 32-bit integer.

**Complexity:** `O(m·n)` time, `O(1)` space.
