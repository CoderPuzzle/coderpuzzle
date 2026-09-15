# Solutions — Total Traveled Distance

## Left-join the rides onto the users and aggregate

Every user must appear once, so `Users` drives the query and rides are
brought in with a `LEFT JOIN`; a user with no ride keeps their row with a
null on the ride side. Grouping by the user and summing `distance` then
gives each user's total, and the null sums produced by users without rides
collapse to 0 through `COALESCE` — no separate pass over riderless users
is needed.

The ordering is a plain one-key sort: because every user appears exactly
once in the grouped result, sorting by `user_id` ascending is enough, and
no tie-breaking is ever required. The join fans out by ride count before
the group, so the engine touches each ride row once.

**Complexity:** `O((U + R) log(U + R))` time for `U` users and `R` rides
(the join fans out every ride once, and grouping plus the final
`user_id` sort dominate), `O(U + R)` space.
