# Solutions — Popularity Percentage

## Double each friendship into a directed edge list, then group and divide

A friendship is stored once, in either column order, but the statement counts
it toward both endpoints: user "2" is a friend of user "1" no matter which of
the pair sat in `user1`. The `directed` CTE makes that symmetry mechanical by
selecting `(user1, user2)` from `Friends` unioned all with its column-swapped
twin `(user2, user1)`. Every friendship then exists twice in the derived row
set — once owned by each endpoint — so grouping those rows by the owner column
and counting partners collapses directly to friend totals. The platform
population falls out of the same derivation: counting `DISTINCT` owners over
the doubled rows counts each distinct user exactly once, which is precisely
"the total number of users on the platform".

One detail keeps the arithmetic honest: the division must happen in floating
point (`100.0 * COUNT(f) / p.users`) before rounding — an integer `500 / 9`
would floor to `50` before `ROUND` ever sees it, quietly producing `50.00`
instead of `55.56`. The `population` CTE reduces to a single row, cross-joined
into the grouped scan so every group divides by the same constant without a
per-row subquery; `ROUND(..., 2)` then snaps each quotient to the required two
decimals, turning `55.55…56` into `55.56` and `11.11…12` into `11.11`. The
final `ORDER BY user1` emits group keys ascending, matching the contract's
ordering even where several users share identical percentages.

Cost-wise, deriving the doubled edges scans `Friends` once per direction (two
linear passes over E rows), materializing 2E rows; the population count reuses
those rows, and grouping aggregates them again with a sort-backed pass over
the key.

**Complexity:** `O(E log E)` time, `O(E)` space.
