# Solutions — Unpopular Books

## Availability filter with a last-year sales subquery

Two independent conditions decide each book's fate. The availability
test compares `available_from` against one month before the assumed
today, `2019-05-23`; a book released later than that has been on sale
for less than a month and is excluded outright, regardless of sales.

For every book that passes, the "less than 10 copies" test sums the
quantities of its orders dispatched within the last year — between
`2018-06-23` and `2019-06-23` inclusive. A correlated subquery computes
that sum per book; `COALESCE` turns the no-orders case into zero so a
book that sold nothing still competes on the same `< 10` threshold.
Orders outside the window, whether old or in the future, fall outside
the bounds and never contribute.

Only rows passing both filters are returned. Each book is examined once
and its orders scanned once for the subquery.

**Complexity:** `O(B + O)` time and `O(1)` extra space, for `B` Books
rows and `O` Orders rows.
