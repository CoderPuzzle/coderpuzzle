# Solutions — Find Followers Count

One grouping answers the question: fold `Followers` on `user_id`, and each
group's `followers_count` is simply its number of rows — the table's own
primary key has already done the deduplication.

## Group per user and count the rows

`GROUP BY user_id` collects every row that names a user into one group, and
`COUNT(*)` reports that group's size. No `DISTINCT` is needed: the
(`user_id`, `follower_id`) primary key lets a follower follow a user at
most once, so within any group the `follower_id` values are already
distinct and counting rows counts followers exactly. A
`COUNT(DISTINCT follower_id)` would return the same figure, but it
re-derives a guarantee the table's key already states — and it is the
habit to reach for only on tables, unlike this one, that admit duplicate
rows.

`ORDER BY user_id` finishes the query with the ascending order the
statement requires. The judge compares result multisets, so the ordering
is a statement requirement rather than a comparison one — carrying it
keeps the output in the promised shape under either contract.

**Complexity:** `O(n log n)` time (ordering), `O(u)` space.
