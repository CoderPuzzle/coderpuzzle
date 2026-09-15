# Solutions — Drop Missing Data

## Filter out the rows whose name is NULL, in frame order

The `students` table already holds one row per DataFrame row, so dropping
the rows with missing data is a filtered scan of that table. `WHERE name
IS NOT NULL` is the SQL counterpart of the pandas dropna mask over the
name column: it keeps exactly the rows that have a name and removes every
row whose name is `NULL` — the only column that can be missing here.
Naming `student_id`, `name`, `age` in the SELECT list, rather than
`SELECT *`, keeps `row_position` out of the result, so the answer is the
frame's own three columns, the shape `students.dropna()` returns.

A table guarantees no order of its own, so the query sorts by
`row_position` with `ORDER BY row_position ASC` to reproduce the frame's
original row order no matter what order the dataset's INSERT statements
used: identity inserts, reversed inserts, and shuffled inserts all
collapse to the same output. The filter is row-wise, so survivors keep
their relative frame order — removing one row never shifts another row's
place in the output.

**Complexity:** `O(n log n)` time, `O(n)` space — the `n` frame rows are
read, filtered, and ordered by `row_position`, and the result holds the
surviving rows.
