# Solutions — Maximum Score From Grid Operations

## Column DP over adjacent heights with prefix-sum credits

An operation only ever extends a column's black top, so repeating operations
on one column is pointless: any play reduces to choosing a height `h[j]` in
`[0, n]` for every column, the number of cells that end up black on top. The
score then has a per-column form. A white cell `(r, j)` earns `grid[r][j]`
exactly when some horizontal neighbor is black, and "left or right neighbor
black at row `r`" is just "`r` sits below the taller flanking height", so
column `j` contributes the contiguous stretch of its column sums from
`h[j]` up to (excluding) `max(h[j-1], h[j+1])`. No greedy rule survives this
shape: raising a column both feeds its neighbors' stretches and destroys its
own scoring cells, so whether a height pays off depends on both flanks, and
the flanks keep changing as their own flanks are chosen.

That three-column coupling is exactly one step of lookahead. Walk the columns
left to right carrying the last two chosen heights `(A, B)`; the moment the
next height `C` is picked, the middle column's two flanks (`B` and `C`) are
both known, so its entire stretch — read in `O(1)` from per-column prefix
sums as the difference of two prefixes — can be credited, once and for all.
Every state therefore holds two heights (`(n+1)²` of them), and each state
extends by trying every next height. Two boundary details vanish into
phantoms: before the first choice there is no left flank (height 0), and
after the last there is no right flank (height 0 again).

The naive transition re-scans every previous height `b`, but the credit
`row[b] + pref[max(A, b, C)] - pref[A]` splits cleanly because the prefixes
are monotone: for `b <= K = max(A, C)` the offset is the constant `pref[K]`,
collapsing onto a running prefix maximum of `row`; for `b > K` each `b`
carries its own `pref[b]`, collapsing onto a suffix maximum of
`row[b] + pref[b]`. That turns every transfer into two table lookups, which
is what keeps the whole search cubic — and cubic is the honest floor here,
since distinguishing which flank binds for each of `O(n²)` height pairs
already requires scanning `O(n)` choices between them. Scores reach
`n² · 10⁹ ≈ 10¹³`, so fixed-width languages must accumulate in 64-bit.

**Complexity:** `O(n^3)` time — `n` columns times `(n+1)^2` states with
`O(1)` amortized transfers via the prefix/suffix maxima — and `O(n^2)` space
for the two height-indexed DP layers.
