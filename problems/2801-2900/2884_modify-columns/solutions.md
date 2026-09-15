# Solutions — Modify Columns

## Replace the salary column with its doubled values in the output

The `employees` table already holds one row per employee, so modifying the
`salary` column is a projection, not a stored mutation: the SELECT list
names `name` unchanged, and the second entry computes `salary * 2 AS
salary`, which doubles each row's own salary column-wise — the SQL
counterpart of `employees['salary'] = employees['salary'] * 2`. Aliasing
the expression as `salary` keeps the output's column name and position
identical to the original frame.

A table guarantees no order of its own, so the query sorts by `row_position`
with `ORDER BY row_position ASC` to reproduce the frame's original row order
no matter what order the dataset's INSERT statements used: identity inserts,
reversed inserts, and shuffled inserts all collapse to the same output.

**Complexity:** `O(n log n)` time, `O(n)` space — the `n` rows are scanned
and sorted by `row_position`, and the result table itself holds all `n`
modified rows.
