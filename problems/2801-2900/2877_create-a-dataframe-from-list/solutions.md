# Solutions — Create a DataFrame from List

## Project the two columns ordered by their list position

The `StudentData` table already holds one row per pair of `student_data`,
so constructing the frame is a straight projection: name the two output
columns in the SELECT list, `student_id` then `age`, and read them from the
table. Naming the columns — rather than `SELECT *` — is what keeps the
result at exactly those two columns in that exact order, the SQL
counterpart of passing `columns=['student_id', 'age']` to the frame
constructor.

The rows must come out in the same order as the original 2D list, and a
table guarantees no order of its own, so the query sorts by `list_position`
with `ORDER BY list_position ASC`. The position column is precisely what
lets the query recover the list's original sequence no matter what order
the dataset's INSERT statements used: identity inserts, reversed inserts,
and shuffled inserts all collapse to the same output.

**Complexity:** `O(n log n)` time, `O(n)` space — the `n` rows are scanned
and sorted by `list_position`, and the result table itself holds all `n`
pairs.
