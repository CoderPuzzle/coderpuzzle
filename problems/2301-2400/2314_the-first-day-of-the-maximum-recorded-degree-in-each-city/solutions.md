# Solutions — The First Day of the Maximum Recorded Degree in Each City

## One ranked row per city

Every candidate answer is a whole `Weather` row, and which row wins is
decided per city by two keys in a fixed priority: the largest degree
first, then the earliest day among ties. A window ranking states that
priority directly — `ROW_NUMBER() OVER (PARTITION BY city_id ORDER BY
degree DESC, day)` numbers each city's days so that row 1 is exactly the
row the statement asks to report. SQLite keeps these `date` values as
ISO-8601 text, so plain `day` ordering is chronological ordering and the
tie-break needs no date arithmetic.

The CTE ranks; the outer query keeps `rn = 1` and orders by `city_id`
for the statement's ascending order (the judge compares rows as an
unordered multiset, so that ordering is contract rather than
correctness). The shape absorbs both edge contracts for free: an empty
table forms no partitions and reports no rows at all, while a city whose
maximum was recorded k times still yields exactly one row — the ranking
is total, since `day` breaks every degree tie and hands number 1 to the
earliest maximum outright.

Ranking sorts each city's days once and the filter then walks one row
per partition, so the cost is a sort of the n rows.

**Complexity:** `O(n log n)` time, `O(n)` space.
