# Solutions — Find Latest Salaries

Per employee, the current record is the one whose salary carries the
greatest value; everything the query does follows from ranking the
records inside each employee group.

## Rank each employee's records by numeric salary, keep the top

A windowed `ROW_NUMBER` partitions rows by `emp_id` and orders each
partition by `CAST(salary AS INTEGER) DESC`, so every employee's records
get positions with the current (greatest) record first. The outer query
keeps only rank 1 — one row per employee, carrying that winning record's
name, salary text, and department as stored — and orders the survivors
by `emp_id` ascending to produce the final table. The cast matters: the
column is textual, so without it a numeric comparison such as `'99999'`
versus `'100000'` would order lexicographically and pick an outdated
record.

Single-record employees need no special casing; their lone row simply
takes rank 1, which is why groups of any size collapse uniformly through
the same filter.

**Complexity:** `O(n log n)` time in the number of records `n` (the
per-partition ordering), `O(n)` space.
