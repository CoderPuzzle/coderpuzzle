# Solutions — Calculate Amount Paid in Taxes

## Bracket walk

Each bracket `i` owns the slice of income between the previous upper bound
`prev` and `min(income, upperᵢ)`; the constraint that the last upper bound is
at least `income` promises this walk covers every dollar earned. Walking the
brackets in order, the taxable slice is taxed at `percentᵢ`, `prev` advances
to `upperᵢ`, and once `income <= upperᵢ` the remaining slice is taxed and the
walk stops. The slice lengths are integers bounded by 1000 and the rates by
100, so the product sum stays exact in any integer type; dividing by 100 a
single time at the end yields the correctly rounded double of the rational
total, comfortably inside the 10⁻⁵ tolerance.

**Complexity:** `O(m)` time, `O(1)` space, where `m = brackets.length`.
