# Solutions — Number of Unique Subjects Taught by Each Teacher

## Group the rows per teacher, deduplicate subjects in the count

The answer lives at the teacher grain while the input sits at the
teaching-assignment grain, so `GROUP BY teacher_id` collapses each
teacher's rows into one and the aggregate does the counting — but with a
set, not a multiset: `COUNT(DISTINCT subject_id)` first folds the
group's subject ids into distinct values and only then counts them. That
distinctness is the whole problem: teacher 1's subject 2 appears once for
department 3 and again for department 4, and plain `COUNT(subject_id)`
would report 3 assignments where 2 unique subjects exist.

Because `comparison` is a multiset over two columns, any row order is
accepted; nothing needs an `ORDER BY`. Teachers exist in the answer only
through `Teacher`, so an empty table forms no groups and reports nothing,
and every surviving group has at least one row behind it — its count is
never zero.

Grouping sweeps the n assignment rows once, charging constant hash work
per row into the distinct sets; the k ≤ n teacher groups are emitted
directly, no sort on top.

**Complexity:** `O(n)` time, `O(n)` space.
