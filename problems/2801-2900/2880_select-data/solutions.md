# Solutions — Select Data

## Filter the rows by student_id, then project the two columns

The `students` table already holds one row per student, so the query is the
hint's two steps applied in order: row filtering and column filtering.
`WHERE student_id = 101` keeps only the matching row — the SQL counterpart
of the pandas mask `students['student_id'] == 101` — and naming `name`,
`age` in the SELECT list, rather than `SELECT *`, keeps the result at
exactly those two columns in that exact order, the counterpart of following
the mask with `[['name', 'age']]`.

Because each dataset's `student_id` values are distinct, the filtered row
set holds at most one row: it is that student's row, or the empty table
when no student has id 101. Nothing about the output depends on where the
matching row sits — first, last, or shuffled somewhere in between — because
`WHERE` scans every row of the table and keeps the ones that satisfy the
predicate, so the query needs no `ORDER BY` at all.

**Complexity:** `O(n)` time, `O(1)` space — the query scans all `n` rows of
the table once, and the result holds at most one `(name, age)` pair.
