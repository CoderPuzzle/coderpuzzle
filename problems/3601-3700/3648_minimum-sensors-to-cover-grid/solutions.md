# Solutions — Minimum Sensors to Cover Grid

## Tiling into sensor squares

A radius-`k` sensor covers exactly the square of side `s = 2 * k + 1` centered
on its cell, clipped where it runs past the border. Cut the `n` rows into
consecutive strips of `s` rows — `ceil(n / s)` of them, the last one possibly
shorter — and cut the `m` columns into `ceil(m / s)` strips the same way. One
sensor per strip intersection covers everything: a full block's center sits
exactly `k` from every edge, and in a short trailing strip, clamping the
sensor to the last existing row or column still leaves at most `s - 1 = 2 * k`
cells on either side of it.

Fewer sensors cannot do. The witness rows `0, s, 2s, ...` inside the grid are
pairwise at least `s` apart — strictly more than the `2k` one sensor's reach
spans row-wise or column-wise — and the same holds for the witness columns.
Each intersection of a witness row with a witness column therefore needs a
sensor that no other such cell can reuse, so at least `ceil(n / s) *
ceil(m / s)` sensors are forced, matching the tiling.

What remains is arithmetic: compute `s` once, take one ceiling division per
axis, multiply. The limits keep every intermediate tiny — `n + s - 1` peaks
at 3001 and the product tops out at 10⁶ for a 1000 × 1000 grid with `k = 0` —
comfortably inside 32-bit range in the fixed-width languages.

**Complexity:** `O(1)` time, `O(1)` space.
