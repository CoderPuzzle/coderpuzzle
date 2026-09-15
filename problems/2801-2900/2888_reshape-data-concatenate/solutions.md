# Solutions — Reshape Data: Concatenate

## Stack the two tables with UNION ALL, then order each block

The two DataFrames are already seeded as the tables `df1` and `df2` with
identical columns, so the vertical concatenation is one compound select:
`SELECT ... FROM df1 UNION ALL SELECT ... FROM df2` appends every df2 row
below the df1 rows without comparing or dropping anything — `UNION ALL`,
not `UNION`, because concatenation keeps duplicate rows, and two frames
may even hold rows that agree on all three columns. Wrapping the compound
select in a derived table lets the outer query project only the three data
columns, so the tag column used for ordering never appears in the result.

A table guarantees no order of its own, so the stacked result must be
sorted explicitly. The dataset contract makes each frame's row order its
ascending `student_id` order, and the tag column marks which frame a row
came from (`1` for df1, `2` for df2), so `ORDER BY part, student_id` puts
all of df1 first in ascending `student_id` order, then all of df2 the same
way — exactly the stacked frame. Sorting by `student_id` alone would be
wrong: ids may interleave between the frames and may even repeat across
them, so the frame tag, not the id, decides which block a row lands in.

**Complexity:** `O((n + m) log(n + m))` time, `O(n + m)` space — the
compound select scans all `n + m` rows of the two tables and sorts the
stacked result, which itself holds every row of both frames.
