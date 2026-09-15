# Solutions — Maximum Distance in Arrays

## One pass over running extremes

Only each array's first and last elements can appear in an optimal pair:
pairing a fixed integer from another array against array `a`, the farthest
element `a` can offer is one of its two ends, since every interior element
sits between them. The problem therefore reduces to the largest
`|first_i - last_j|` or `|last_i - first_j|` over two different arrays `i`
and `j` — the sorted guarantee puts the extremes at the ends, so nothing
else ever needs to be read.

The tempting shortcut, subtracting the overall minimum from the overall
maximum, breaks the different-arrays rule exactly when both extremes live in
one array: for `[[1,5],[2,3]]` the span `5 - 1 = 4` is unattainable, and the
true answer is `3`. The sweep enforces the rule structurally instead. It
walks the arrays once, carrying the smallest first and the largest last of
the arrays already seen; each new array tries both of its ends against those
two running extremes — the partner is guaranteed to come from an earlier,
different array — and only afterwards folds its own ends into them. Every
unordered pair of arrays is weighed exactly when its later member arrives,
so no candidate is missed.

With `m` up to `10⁵` this stays a single pass reading two elements per array.

**Complexity:** `O(m)` time, `O(1)` space.
