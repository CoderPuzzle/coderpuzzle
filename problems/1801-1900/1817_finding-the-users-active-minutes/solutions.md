# Solutions — Finding the Users Active Minutes

A user's UAM is just the number of distinct minutes attached to their id, and
every user contributes one tally to exactly one bucket of the answer, so the
whole problem reduces to grouping the logs by user.

## Group logs by user, then bucket the distinct-minute counts

Walk `logs` once and accumulate a map from user id to a set of that user's
minutes — duplicates of the same `(user, minute)` pair collapse in the set,
which is exactly the "a minute counts once" rule. Afterwards, iterate the
map's values: a user whose set holds `uam` minutes increments
`answer[uam - 1]`, translating the statement's 1-indexed `j` into the array's
0 indexing. The answer starts as `k` zeros, so users are only ever tallied,
never allocated.

`k` is at least the maximum UAM over all users by the constraints, so every
user lands inside the array; a user absent from the logs contributes nothing,
and only ids that actually appear in `logs` are ever created in the map. Ids
up to 10⁹ and minutes up to 10⁵ both sit far inside 32-bit range, and every
counted value is at most `logs.length`, so no wider arithmetic is needed
anywhere.

**Complexity:** `O(n + k)` time, `O(n + k)` space.
