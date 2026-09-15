# Solutions — Change Data Type

## Convert the grade column with CAST in the output

The `students` table already holds one row per frame row, so converting
the `grade` column is a projection, not a stored mutation: the SELECT
list carries `student_id`, `name`, and `age` unchanged, and the fourth
entry computes `CAST(grade AS INTEGER) AS grade`, which re-types each
row's own grade column-wise — the SQL counterpart of converting the
frame's dtypes with a dictionary, `students.astype({'grade': int})`.
SQLite's cast truncates the stored `REAL` toward zero, so `73.9`
becomes `73` and `-73.9` becomes `-73`, exactly the integer conversion
the statement asks for. Aliasing the expression as `grade` keeps the
output's column name and position identical to the original frame.

A table guarantees no order of its own, so the query sorts by
`row_position` with `ORDER BY row_position ASC` to reproduce the frame's
original row order no matter what order the dataset's INSERT statements
used: identity inserts, reversed inserts, and shuffled inserts all
collapse to the same output.

**Complexity:** `O(n log n)` time, `O(n)` space — the `n` rows are
scanned and ordered by `row_position`, and the result table itself holds
all `n` converted rows.
