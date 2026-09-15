# Solutions — Minimum Cost for Cutting Cake II

Every line has to be cut eventually, but a line's price is charged once for
each piece that still spans it when that line gets cut: a horizontal cut
made while `v` vertical strips exist costs `horizontalCut[i] * v`. So the
multiplier a line pays is fixed by how much perpendicular splitting has
already happened, and an expensive line wants to be cut while the cake is
still in as few pieces as possible.

## Greedy: always cut the most expensive remaining line

An exchange argument settles the order. Take any schedule and look at two
adjacent operations — cutting horizontal line `a`, then vertical line `b` —
while the current strip counts are `hp` rows and `vp` columns. That order
costs `a * vp + b * (hp + 1)`; swapping them costs `b * hp + a * (vp + 1)`.
The difference is exactly `a - b`, so whenever a cheaper line runs before
a more expensive one, swapping them never increases the total. Repeated
swapping sorts the whole schedule by descending cost, with ties free, which
proves the greedy order optimal.

Implement it with two pointers over both arrays sorted descending and two
strip counters starting at 1: repeatedly take the larger remaining head,
add its cost times the opposite counter, and bump the counter of the family
just cut. Lines of the same family commute, so only this cross-family order
matters. The total is bounded by `(10⁵ - 1) * 10³ * 10⁵ < 2 * 10¹³` per
family — far past 32-bit range, yet well inside the `2⁵³` exactness window
of doubles — so the compiled languages accumulate in 64-bit integers
(`long long`, `long`, `int64`, `i64`) from the first product and return a
64-bit answer; JavaScript numbers hold these sums exactly.

**Complexity:** `O((m + n) log(m + n))` time, `O(m + n)` space.
