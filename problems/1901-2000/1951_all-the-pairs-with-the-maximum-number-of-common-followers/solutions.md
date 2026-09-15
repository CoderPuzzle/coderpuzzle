# Solutions — All the Pairs With the Maximum Number of Common Followers

Two users share a follower exactly when that follower appears in both users'
`follower_id` lists, so the common-follower count of a pair is a self-join
on `follower_id` grouped by the user pair. The remaining work is to keep
only the pairs whose count ties the maximum.

## Self-join on follower, count, keep the maximum

Joining `Relations r1` against `Relations r2` on equal `follower_id` with
`r1.user_id < r2.user_id` produces one row per (pair, shared follower); the
strict inequality kills self-pairs and canonicalizes each pair with its
smaller id first. Grouping by the user pair and counting `DISTINCT
r1.follower_id` yields the common-follower count for every pair that shares
at least one follower — the rows of the `counts` CTE.

The outer query filters with `common = (SELECT MAX(common) FROM counts)`,
which translates the statement's "maximum number of common followers"
directly: every pair tying the max is returned, in any order. Only pairs
that share at least one follower appear in the join, which is exactly the
population the statement's `maxCommon` ranges over — a pair sharing no
follower has count 0 and can never tie a positive maximum, so the
filtering never needs the cross product of all users.

**Complexity:** `O(R²)` time in the worst case over `R` relation rows,
`O(R²)` space for the join output.
