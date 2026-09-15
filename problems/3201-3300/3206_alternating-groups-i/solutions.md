# Solutions — Alternating Groups I

Groups overlap: tile `i` sits at the center of exactly one 3-tile window of
the circle, and whether that window alternates is a purely local question
about three colors. Counting centers therefore decides the answer directly,
with no window ordering to track.

## Circular neighbor comparison

Per the hint, a 3-tile window with center `i` alternates precisely when both
circular neighbors of `i` hold the color opposite `colors[i]`, so the answer
is the number of tiles whose previous and next tiles — taken modulo the
circle length, so tile `n - 1` neighbors tile 0 and vice versa — differ from
it. One linear pass with wraparound indexing counts them; no auxiliary state
is needed. The count never exceeds `n <= 100`.

**Complexity:** `O(n)` time, `O(1)` space.
