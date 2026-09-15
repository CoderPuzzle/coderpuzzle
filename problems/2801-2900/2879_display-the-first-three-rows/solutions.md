# Solutions — Display the First Three Rows

## Project the four columns ordered by row position and stop at three

The `Employees` table already holds one row per DataFrame row, so
displaying the frame's first three rows is a straight ordered scan with a
limit. Name the four output columns in the SELECT list — `employee_id`,
`name`, `department`, then `salary` — read them from `Employees`, sort by
`row_position`, and keep `LIMIT 3`. Naming the columns rather than
`SELECT *` keeps the result at exactly the frame's four columns in frame
order, and the limit is what turns the whole-frame scan into the
first-three-rows display `head` produces.

The boundary behavior comes built in: a frame with fewer than three rows
lets every row through, so the same query serves the one-, two-, and
zero-row frames. And the answer does not depend on the order the
dataset's INSERT statements happened to use, because `row_position`
records each row's 1-based place in the frame — `ORDER BY row_position`
recovers the frame's own row order, so reversed and shuffled inserts
collapse to the same output. Ordering by a data column instead would be
wrong: employee ids may descend while frame order ascends, and duplicate
rows that differ only by position would come out in an arbitrary order.

**Complexity:** `O(n log n)` time, `O(n)` space — the `n` frame rows are
read and ordered by `row_position`, while the displayed result itself
keeps only the first three rows.
