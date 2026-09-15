# Solutions — Tasks Count in the Weekend

## One pass of conditional counting

Every row's fate is decided by one fact — which weekday its date falls
on — so the query first lifts that fact out per row: a CTE maps each
task to `strftime('%w', submit_date)`, SQLite's weekday code that reads
the ISO-8601 date text and yields `'0'` for Sunday through `'6'` for
Saturday. The weekend is exactly `'6'` or `'0'`; every other code is a
working day.

The two report columns are then two counts over those codes. SQLite
evaluates each boolean as 1 or 0, so `SUM(wd IN ('0', '6'))` adds one
per weekend task and `SUM(wd NOT IN ('0', '6'))` adds one per working
task — complementary predicates, so the two sums always total the row
count of the table. Each `SUM` is wrapped in `COALESCE(..., 0)`: an
empty table produces no rows for the aggregate to walk, `SUM` of zero
rows is NULL rather than zero, and the contract pins both counts to 0
there, still reported as one `[0, 0]` row.

No grouping or ordering work is needed — the answer is a single row,
and the statement accepts it in any order. The CTE scans the n rows
once and the aggregation walks the same codes once more.

**Complexity:** `O(n)` time, `O(1)` space.
