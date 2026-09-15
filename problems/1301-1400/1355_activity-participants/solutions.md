# Solutions — Activity Participants

## Approach: Count per activity, window out the extremes

Every activity has at least one participant (the statement guarantees each
`Activities` row is performed by someone in `Friends`), so counting
`Friends` grouped by activity gives every activity's participation. A
window over that grouped table attaches the global maximum and minimum
counts to every row — `MAX(c) OVER ()` and `MIN(c) OVER ()` — and the
outer filter keeps exactly the rows strictly between the two.

The join to `Activities` is not even needed for counting (a friend's
activity names the row), but selecting from the grouped Friends rows keeps
the output to activity names that exist in the corpus; any output order is
allowed, so the query has no `ORDER BY`.

**Complexity:** `O(F log F)` for the group-by and window sort with `F`
friends, `O(A)` output.
