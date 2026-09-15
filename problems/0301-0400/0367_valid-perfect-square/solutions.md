# Solutions — Valid Perfect Square

## Binary search on the root

The squares march upward in lockstep — 1, 4, 9, 16, … — the map
`r -> r * r` is strictly increasing over the positive integers, so "is
`num` a perfect square" asks whether one sorted row contains `num`, and a
sorted row is exactly what binary search interrogates. No `sqrt`, no
library call: the only probe the statement leaves available is the
multiplication itself.

The code keeps the root candidates in `lo..hi`, starting at `1..num` — a
root never exceeds its own number, so the interval holds the answer
whenever there is one. Each probe squares the midpoint: a square below
`num` moves `lo` above the midpoint, a square above `num` drops `hi`
below it, and the interval halves until it empties. Only a probe that hit
`num` exactly ever returned `true` — `1` closes at once (`1 = 1²`), `14`
narrows to the gap between `3² = 9` and `4² = 16`, and `16` lands on `4²`
dead center.

The arithmetic, not the search, is the trap: `num` tops out at `2³¹ - 1`
while its root tops out at `46340`, but the first midpoint sits near
`num / 2` and squares to about `1.15 × 10¹⁸` — past 32 bits, and past the
`2⁵³` where a double stops counting integers exactly. The fixed-width
languages square in a 64-bit type (`long long`, `long`, `i64`; Go's `int`
already is one) and take the midpoint as `lo + (hi - lo) / 2` wherever
`lo + hi` could itself overflow; the double-only pair, JavaScript and
TypeScript, never square at all — each probe compares `mid` against
`num / mid`, a quotient that stays small and reads exact at this width.

**Complexity:** `O(log num)` time, `O(1)` space.
