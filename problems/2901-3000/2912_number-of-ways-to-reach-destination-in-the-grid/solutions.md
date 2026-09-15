# Solutions — Number of Ways to Reach Destination in the Grid

Every allowed move keeps one coordinate fixed and changes the other: from
`[x1, y1]` you may jump to any `[x2, y1]` with `x2 ≠ x1`, or to any
`[x1, y2]` with `y2 ≠ y1`. So over a sequence of exactly `k` moves the two
coordinates evolve independently — each move is either an `x`-move or a
`y`-move — and a walk is determined by which of the `k` moves are `x`-moves,
by the sequence of `x` values the `x`-moves visit, and by the sequence of
`y` values the `y`-moves visit.

## Coordinate contraction with binomial interleavings

Count, on a line of `size` cells, the walks of `t` steps that start at
`start`, end at `target`, and never stay in place. Track `a[t]`, the number
of such walks ending exactly at `target`, and `b[t]`, those ending anywhere
else: a step into `target` can come from any of the other `size - 1`
positions, so `a[t + 1] = b[t]`; a step elsewhere offers `size - 2`
destinations from a non-target position and `size - 1` from the target, so
`b[t + 1] = (size - 2) * b[t] + (size - 1) * a[t]` — all mod `10⁹ + 7`,
with `size` up to `10⁹` only ever entering through its residue. Building
these tables costs one linear pass per coordinate.

If `i` of the `k` moves are `x`-moves, the `x` values form a `t = i` step
walk and the `y` values a `k - i` step walk, and the two subsequences can be
interleaved in `C(k, i)` ways. Summing `C(k, i) · ax[i] · ay[k - i]` over
`i` with factorial inverses gives the answer; `k <= 10⁵` keeps every loop
linear. Intermediates are products of two residues, near `10⁹` each: they
exceed 32-bit ranges, so the compiled languages carry them in 64-bit
integers, while JavaScript and TypeScript split each operand's low 15 bits
out so no Number ever passes `2⁵³`.

**Complexity:** `O(k)` time, `O(k)` space.
