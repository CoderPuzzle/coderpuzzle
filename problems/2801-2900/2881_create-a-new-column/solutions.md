# Solutions — Create a New Column

## Project the salary doubled into a third output column

The `employees` table already holds one row per employee, so creating the
`bonus` column is a projection, not a mutation: the SELECT list names all
three output columns, `name` and `salary` pass through unchanged, and the
third entry computes `salary * 2 AS bonus`, which doubles each row's own
salary element-wise — the SQL counterpart of `employees['bonus'] =
employees['salary'] * 2`. Aliasing the expression as `bonus` fixes the new
column's name and its place as the last of the three output columns.

A table guarantees no order of its own, so the query sorts by `row_position`
with `ORDER BY row_position ASC` to reproduce the frame's original row order
no matter what order the dataset's INSERT statements used: identity inserts,
reversed inserts, and shuffled inserts all collapse to the same output.

**Complexity:** `O(n log n)` time, `O(n)` space — the `n` rows are scanned
and sorted by `row_position`, and the result table itself holds all `n`
triples.
