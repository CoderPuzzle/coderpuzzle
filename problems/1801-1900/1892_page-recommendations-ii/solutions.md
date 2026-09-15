# Solutions — Page Recommendations II

The recommendation for a user is any page liked by at least one of their
friends but not by themselves, counted over distinct friends. That is a
friendship expansion joined to the likes, a self-like exclusion, and a
per-user/per-page count.

## Union-expanded friends joined to likes

The first problem is that `Friendship` stores each undirected friendship
as a single row, so user `1`'s friends are the `user2_id` values of rows
where `user1_id = 1` _and_ the `user1_id` values of rows where
`user2_id = 1`. A subquery therefore emits both orientations — every
`(user1_id, user2_id)` row plus its mirror — so each user's row lists
one friend. The mirror rows are deduplicated by `UNION`, which also
absorbs the rare case where a pair is stored in both directions.

The mirrored relation is joined to `Likes` on `friend_id = user_id`, so
each row becomes "user U sees that friend F likes page P". A `NOT
EXISTS` correlated subquery then drops every such row whose page `U`
already likes, enforcing the "not liked by user" condition. Finally,
`GROUP BY user_id, page_id` with `COUNT(*)` collapses the surviving rows
into one `(user_id, page_id, friends_likes)` triple, where the count is
exactly the number of distinct friends of `U` who like `P` — each
contributing friend produced exactly one joined row.

The output column order matches the statement, and the row set is
compared in sorted order, which suits the "in any order" result.

**Complexity:** `O(E + L)` time and `O(E + L)` space to expand the
`E` friendships and scan the `L` likes, plus the sort cost of the
grouping; `O(n log n)` worst-case time in the row count `n`.
