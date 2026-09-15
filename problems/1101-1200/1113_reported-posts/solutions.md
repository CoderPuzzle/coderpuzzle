# Solutions — Reported Posts

## Filter, then count distinct posts per reason

Two facts decide which rows matter at all: the action must be `report`, and
the date must be yesterday, `2019-07-04` (today is fixed at `2019-07-05`).
Both are plain equality predicates in a `WHERE` clause, which shrinks the
table to the report rows of that one day before any grouping happens.

What is counted is the number of **posts**, not the number of reports — many
users may report the same post, and duplicate rows are allowed. `COUNT
(DISTINCT post_id)` is the exact fit: within each `extra` group it collapses
repeated post ids into one. Grouping by `extra` yields one row per report
reason, and reasons that never appear simply never form a group, which is
the "non-zero number of reports" rule of the example.

**Complexity:** `O(N)` time over the `N` Actions rows with a hash set per
reason, `O(R × P)` space in the worst case for `R` reasons and their
distinct posts.
