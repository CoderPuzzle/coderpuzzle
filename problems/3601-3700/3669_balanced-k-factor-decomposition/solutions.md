# Solutions — Balanced K-Factor Decomposition

## Divisor backtracking

Every factor of a decomposition divides `n`, so the search space is not the
numbers up to `n` but the divisor list. Trial division up to `sqrt(n)`
collects each divisor pair `(d, n / d)`, and sorting the result gives the
vocabulary the search works over. A depth-first search then builds a
decomposition factor by factor: it may only append a divisor that is at
least the last one chosen, and when one slot remains the final factor is
forced to `n / product`, merely having to respect that nondecreasing rule.
Reporting factors in nondecreasing order also settles the deterministic
tie-break for free — smaller factors are tried first, so complete splits come
out of the search in lexicographic order, and replacing the best split only
on a strictly smaller spread leaves the lexicographically smallest optimal
split standing.

The spread of a completed split needs no scan. A path built nondecreasingly
has its minimum in the first slot and its maximum in the forced last one, so
comparing `last - first` against the best so far is enough. Pruning falls out
of the same shape: a branch dies as soon as its running product would exceed
`n`, so the walk visits only prefixes that can still extend into real
decompositions — a few thousand nodes even for the most composite `n` this
constraint range allows. The recursion depth is bounded by `k <= 5`, and
every intermediate product divides `n`, so machine integers hold everything
without a second thought.

**Complexity:** `O(sqrt(n) + D^k)` time, `O(k)` space, where `D` is the
number of divisors of `n`.
