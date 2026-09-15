# Solutions — Minimum Moves to Balance Circular Array

## Distance-sorted greedy transfer

With at most one negative balance there is exactly one deficit to fill,
so the geometry collapses: a person at circular distance `d` from the
negative index spends exactly `d` moves per unit they give, no matter
which way around the ring the units travel or who passes them along. The
cheapest plan therefore fills the deficit in non-decreasing distance
order — collect every positive balance as a `(distance, amount)` supply,
sort it, and drain the deficit greedy-style, taking `min(amount,
remaining)` from each nearest giver until the negative is covered.

Two cases short-circuit the sweep. If nobody is negative, zero moves are
needed; if the total balance is negative, the deficit exceeds the total
supply and no sequence of transfers can help, so the answer is -1. When
the total is non-negative the supply is guaranteed to cover the deficit
(the two differ by exactly the rest of the array), so the greedy always
finishes. Ties between the two sides at equal distance are free: the
per-unit cost is the distance, which is the same either way.

The count is what forces 64-bit arithmetic: a `-10⁹` balance filled from
half a ring away costs up to `10⁹ × 5·10⁴ = 5·10¹³` moves, far past 32
bits, so fixed-width languages accumulate and return through 64-bit
integers (`long long`, `long`, `int64`, `i64`). JavaScript numbers stay
exact below 2⁵³, and Python integers are unbounded.

**Complexity:** `O(n log n)` time, `O(n)` space.
