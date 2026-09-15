# Solutions — Rolling Average Steps

## Self-join each day against its two calendar predecessors

A day has a defined 3-day rolling average exactly when the same user owns
rows on the two calendar days immediately before it, so the natural query
joins `Steps` to itself twice: once for yesterday and once for the day
before yesterday. SQLite's `DATE(steps_date, '-1 day')` modifier performs
real calendar arithmetic on the ISO date string — month rolls, year rolls,
and February lengths are all handled by the date library — so a window is
accepted precisely when both predecessor dates exist as actual rows of that
user. The primary key `(user_id, steps_date)` makes each join hit at most
one row, meaning every qualifying day contributes exactly one output row
with no duplication.

Days that must not produce output fail the inner joins outright: a missing
yesterday or a missing day-before-yesterday drops the row before any value
is computed. Days whose would-be window reaches across an earlier gap also
drop out — reaching two days back never finds substitute rows from further
away because the predicate matches one exact calendar date. What survives
is averaged with plain integer addition divided by 3.0 (the `.0` forces
float division) and shaped by `ROUND(..., 2)` into the two-decimal rolling
average. Finally, `ORDER BY user_id ASC, steps_date ASC` emits the result
table in the required ascending order of user and then date.

**Complexity:** `O(n log n)` time, `O(1)` extra space beyond the scan —
with an index on `(user_id, steps_date)` each of the `n` rows probes its
two predecessors in logarithmic time; without one it degenerates to two
linear scans, still `O(n)` rows touched per predecessor lookup.
