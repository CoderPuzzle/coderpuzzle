# Solutions — Page Recommendations

## Collect the friends, join their likes, subtract your own

Friendship is undirected on disk: user 1 may sit in either column. The set
of user 1's friends is therefore the `user2_id` values of rows keyed by
`user1_id = 1` unioned with the `user1_id` values of rows keyed by
`user2_id = 1` — the `UNION` also deduplicates any friend reached through
both directions.

Joining that friend set to `Likes` gathers every page some friend likes;
`SELECT DISTINCT` collapses repeats such as page 77 liked by two different
friends. The exclusion of pages user 1 already likes is phrased as an
anti-join — `WHERE NOT EXISTS (SELECT 1 FROM Likes mine WHERE ...)` — which
keeps a page only when no row ties it to user 1's own like list.

**Complexity:** `O(f + l)` time to scan the friendship and like tables (with
index lookups for the filters and probes) and `O(f + l)` space.
