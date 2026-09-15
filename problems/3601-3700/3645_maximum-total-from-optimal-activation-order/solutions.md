# Solutions — Maximum Total from Optimal Activation Order

## Greedy cap per limit group

An element with limit `L` is usable only while fewer than `L` elements are
active. Bound how many elements of one limit group any order can activate:
before the group's s-th pick happens, its earlier `s - 1` picks must all
still be alive — a picked limit-`L` element can only die once the active
count reaches `L`, and that very moment permanently locks out every
remaining limit-`L` element. So the count before the s-th pick is at least
`s - 1`, and legality forces `s <= L`: at most `min(L, m)` elements can ever
be activated from a group holding `m` of them, and since every value is
positive, taking the largest ones is the best any order can do. The budgets
never interact across groups, so the answer sums each group's top
`min(L, m)` values.

The same total falls out of a single sorted scan. Sort `(value, limit)`
pairs by value descending and keep one counter per distinct limit; accept a
pair only while its group has accepted fewer than `limit` pairs. Descending
value order means the first `min(L, m)` accepted pairs of each group are
exactly its largest, and everything else is skipped on the spot. The bound
is attainable — activating groups in ascending limit order walks every
planned pick through with room to spare — so the scan returns the maximum.

The totals reach `n * max(value) = 10¹⁰`, past 32 bits, so every compiled
language accumulates in 64-bit (`long long`, `long`, `int64`); JavaScript
numbers are doubles, exact through `2⁵³`, so they hold it untouched.

**Complexity:** `O(n log n)` time, `O(n)` space.
