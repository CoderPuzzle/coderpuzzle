# Solutions — Reconstruct a 2-Row Binary Matrix

## Count, validate, assemble

The `colsum[i] = 0` and `colsum[i] = 2` columns leave no choice: a `2` puts a
one in both rows, a `0` in neither. Only the `o` one-columns are free, and
moving a single column between rows just shifts one unit, so any split that
spends exactly `upper` ones on top is as good as any other — the matrix can be
assembled directly once the counts agree.

With `t` two-columns, the top row needs at least `t` ones (every `2` costs it
one), and can absorb at most `t + o`. So a matrix exists exactly when
`sum(colsum) = upper + lower` and `t <= upper <= t + o` (which also forces
`t <= lower`). When it does, hand the first `upper - t` one-columns to the top
row, the rest to the bottom, and write out the two rows.

**Complexity:** `O(n)` time, `O(n)` space for the output (O(1) beyond it).
