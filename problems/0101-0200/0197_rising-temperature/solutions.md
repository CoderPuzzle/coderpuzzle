# Solutions — Rising Temperature

## Self-join on yesterday

The condition relates two rows of the same table — a day's reading and the
reading of the calendar day before it — so the query joins `Weather` with
itself: `Weather w1` (today) against `Weather w2` (yesterday) on
`w1.recordDate = DATE(w2.recordDate, '+1 day')`. SQLite's `DATE` modifier
performs true calendar arithmetic — month edges, year edges, and leap days
all resolve to the actual next day — and because `recordDate` values are
unique, each row pairs with at most one yesterday. The filter
`w1.temperature > w2.temperature` keeps strictly hotter days: equal
readings and drops are excluded. Only `w1.id` is projected, so one row
leaves per qualifying day.

Days without a yesterday never appear: the table's first day, and any day
whose predecessor is missing because the dates have a gap, match nothing in
the join — the correct no-comparison behavior rather than a special case.
The mirror form `w2.recordDate = DATE(w1.recordDate, '-1 day')` states the
same pairing from the other side; a LAG window over `recordDate` reaches it
too (`LAG(temperature) OVER (ORDER BY recordDate)` compared against the
current row), but the self-join needs no ordering and names the day relation
directly.

The join builds one lookup structure over `w2`'s rows and probes it once per
`w1` row — with `W` rows in `Weather` that is one pass plus the probe
structure; absent any index on the date column the engine may nested-loop
the pairing at `O(W^2)` comparisons instead.

**Complexity:** `O(W)` time, `O(W)` space.
