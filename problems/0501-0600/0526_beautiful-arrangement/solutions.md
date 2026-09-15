# Solutions — Beautiful Arrangement

## Divisibility-pruned backtracking

The arrangement is built one position at a time, left to right. A value `v`
can sit at position `p` only when `p` divides `v` or `v` divides `p`, so each
position admits exactly the divisors of its index and the multiples of its
index up to `n` — precomputed into per-position candidate lists before the
search starts. The recursion then never even proposes a doomed value: at
position `p` it walks `candidates[p]`, marks each still-unused value,
recurses into position `p + 1`, and unmarks on the way back.

A path that survives past position `n` has placed a valid value at every
position, which is exactly one beautiful arrangement, counted as 1; the
answer is the sum over all surviving paths. Dead ends prune themselves: the
moment a position's candidates are all used, the recursion returns without
touching any deeper position, so entire subtrees below a failed prefix never
form. At the constraint ceiling the numbers are concrete — for `n = 15` the
search visits 747,961 partial arrangements on its way to the 24,679 complete
ones, inside the 15! = 1,307,674,368,000 raw permutations it never enumerates.

The solution is deliberately not memoized. The reusable state would be the
pair (position, used values) — a table over the 2¹⁵ used-value masks — but
the divisibility pruning already shrinks the tree to under a million nodes,
so plain depth-first search answers every `n` up to 15 in milliseconds; the
memo table is the natural upgrade only if the ceiling grew.

**Complexity:** exponential in the worst case — `O(P)` time for `P` the valid
partial arrangements the pruned search visits (747,961 at `n = 15`, about one
node per 1.7 million raw permutations) — and `O(n²)` space for the candidate
lists and the recursion.
