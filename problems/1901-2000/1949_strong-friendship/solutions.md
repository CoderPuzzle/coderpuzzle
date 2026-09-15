# Solutions — Strong Friendship

A friendship is strong exactly when the pair shares at least three mutual
friends, so the query needs each friendship edge's common-neighbor set. The
natural shape is a directed neighbor index, then an intersection of the two
users' friend lists per edge.

## Directed edge union, join, group count

The `friends` CTE expands `Friendship` into both directions: each stored
`(user1_id, user2_id)` row (already in `user1_id < user2_id` order) also
yields the reverse `(user2_id, user1_id)`. A user's friends are then exactly
the rows whose `a` column holds their id. For every friendship edge `(u1,
u2)` from the base table, joining `friends x` on `x.a = u1` and `friends y`
on `y.a = u2 AND y.b = x.b` pairs up each candidate friend once — `x.b` is
a friend of `u1`, `y.b` is a friend of `u2`, and the equality forces them to
be the same user, so a common friend of `u1` and `u2` contributes exactly
one joined row.

Grouping by the edge and counting `DISTINCT x.b` yields the common-friend
count; `HAVING COUNT(...) >= 3` keeps only strong friendships and emits the
two ids in the table's stored `user1_id < user2_id` order. The `DISTINCT`
is defensive — the primary key already ensures each directed edge appears
once — and the grouping runs over the edge set, so the work stays
proportional to the pairs that actually share a friend.

**Complexity:** `O(E²)` time in the worst case over `E` friendship edges,
`O(E)` space for the directed edge index.
