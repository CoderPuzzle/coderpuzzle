# Solutions — Active Users

## Streak grouping by date minus row number

Same-day repeats must count once, so the innermost subquery takes
`DISTINCT (id, login_date)`. From there the classic streak trick applies:
number each user's dates in ascending order and compute
`DATE(login_date, '-N days')` where `N` is that row number minus one.
Inside a run of consecutive days the offset exactly cancels the day
advance, so every member of the run shares one "streak anchor" date; a
gap breaks the equality and starts a new anchor.

Grouping by `(id, anchor)` and keeping groups with `COUNT(*) >= 5` yields
the users holding a five-day streak — any longer streak survives too,
and several disjoint streaks simply produce several groups. A final
`DISTINCT` over the surviving ids (a user may appear once per qualifying
streak) feeds a join to `Accounts` for the names, ordered by `id`.

The query generalizes to an `n`-day definition by changing the single
`5` in the `HAVING` clause.

**Complexity:** `O(L log L)` for the sort behind the row numbering, over
`L` deduplicated login rows; `O(L)` space.
