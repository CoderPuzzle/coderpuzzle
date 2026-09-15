# Solutions — Number of Squareful Arrays

Permuting indices counts every duplicate's reorderings separately, but equal
values are interchangeable — a permutation is already fixed once the number
of copies of each distinct value is chosen at every step. What survives that
collapse is a search over distinct values, small enough to walk directly.

## Multiset backtracking over a square-sum adjacency table

Collapse `nums` into its distinct values with multiplicities, and precompute
an adjacency table recording whether `values[i] + values[j]` is a perfect
square. The diagonal matters as much as the rest: two equal values may sit
adjacent exactly when twice the value is a square, which is what lets runs of
the same value chain. Values reach 10⁹, so pair sums reach 2 · 10⁹ — beyond
signed 32-bit — and the square test takes an exact integer root (floor the
root, then compare the square) rather than trusting a floating-point result.

The search starts a sequence from each distinct value and extends it only
through adjacent values that are still in stock, decrementing a multiplicity
on the way down and restoring it on the way up; a branch that consumes all
`n` elements is one squareful permutation. Dead ends cost nothing, because
the loop only ever iterates admissible successors. Counting each distinct
value sequence once is exactly the multiset semantics the rule for different
permutations asks for: `[2,2,2]` has the single ordering it visibly has.

**Complexity:** `O(d! · d²)` worst case (`d` = distinct values, `d <= 12`)
time, `O(d²)` space.
