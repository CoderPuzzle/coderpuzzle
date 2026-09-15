# Solutions — Smallest Substring With Identical Characters II

With `n` up to `10⁵`, trying flip placements is hopeless, but feasibility is
monotone: if some sequence of at most `numOps` flips caps the longest
identical-character run at `m`, the same sequence caps it at any larger `m`.
The answer is therefore the smallest feasible cap, found by bisecting `[1, n]`
against a cost predicate.

## Binary search the cap, count flips per run

For `m >= 2` the predicate decomposes cleanly: a run of length `L` splits into
pieces of length at most `m` exactly when it receives `floor(L / (m + 1))`
interior flips — one placed at every `(m + 1)`-th position strictly inside the
run, where each flipped character is hemmed in by the run's own character and
so cannot lengthen a neighboring run. Fewer flips always leave some piece
above `m` — `f` flips inside a run leave at most `m·f + (f + 1)` original
positions, which is too few for `L` when `f < floor(L / (m + 1))` — and since
the placements never interact across runs, summing the per-run floors over all
runs gives the exact minimum flip count. The cap `m` is feasible iff that sum
stays within `numOps`.

The cap `m == 1` is the one case where runs interact, because a flip at a run
boundary can bridge two runs — `"1001"` needs two flips to alternate, though
its runs considered apart would suggest one. There the predicate is simply the
smaller Hamming distance from `s` to one of the two fully alternating target
strings. The bisection calls the predicate `O(log n)` times, each an
`O(n)` scan, which is comfortably fast at `n = 10⁵`.

**Complexity:** `O(n log n)` time, `O(1)` extra space.
