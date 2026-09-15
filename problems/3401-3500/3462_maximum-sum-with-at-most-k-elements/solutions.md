# Solutions — Maximum Sum With at Most K Elements

Two constraints bound the choice: at most `k` elements overall, and at most
`limits[i]` from row `i`. Because every matrix value is non-negative, more
elements never hurt — the only question is which elements are ever worth
considering.

## Pool the per-row maxima, take the k largest

An exchange argument shrinks the search space: within any row, swapping a
chosen element for a larger unchosen one keeps the row's count (and hence
feasibility) intact and cannot lower the sum. So some optimal selection
draws only from each row's top `limits[i]` values. Pool those candidates —
at most `sum(limits)` of them — sort the pool descending, and sum the first
`k` entries.

The implementation sorts each row descending, extends the pool with the
row's first `limits[i]` entries, then sorts the pool once and sums a
prefix. The answer can reach `250000 * 10⁵ = 2.5×10¹⁰`, so the
accumulator is 64-bit in every language (Python ints are unbounded; JS
numbers are exact because the bound sits far below 2⁵³). Ties need no
special care: equal values contribute equally whichever of them is taken.

**Complexity:** `O(nm log m + S log S)` time with `S = sum(limits) <= nm`,
and `O(nm)` space.
