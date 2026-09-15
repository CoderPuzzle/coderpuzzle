# Solutions — Smallest Substring With Identical Characters I

Feasibility is monotone: if some sequence of at most `numOps` flips caps the
longest identical-character run at `m`, the same sequence caps it at any
larger `m`. So the answer is the smallest feasible `m`, found by binary
search over `[1, n]` once a cost predicate is fixed.

## Binary search the cap, count flips per run

For `m >= 2` the predicate decomposes cleanly: a run of length `L` splits
into pieces of length at most `m` exactly when it receives
`floor(L / (m + 1))` interior flips — place a flipped character at every
`(m + 1)`-th position strictly inside the run, where it is hemmed in by the
run's own character and so cannot lengthen a neighboring run. Fewer flips
always leave some piece above `m`, and since the flips never interact across
runs, summing the per-run floors over all runs gives the exact minimum flip
count; the cap `m` is feasible iff that sum stays within `numOps`.

The cap `m == 1` is the one case where runs do interact, because a flip at a
run boundary can bridge two runs — `"1001"` needs two flips to alternate,
though its runs considered apart would suggest one. There the predicate is
simply the smaller Hamming distance from `s` to one of the two fully
alternating target strings. The search itself is the standard lower-bound
bisection over `[1, n]`, calling the predicate `O(log n)` times.

**Complexity:** `O(n log n)` time, `O(1)` extra space.
