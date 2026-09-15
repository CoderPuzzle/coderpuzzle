# Solutions — Actors and Directors Who Cooperated At Least Three Times

## One Group per Pair, Filtered by Count

Group `ActorDirector` by `(actor_id, director_id)` — every row already
names one collaboration event between that actor and that director, so
each group's row count is exactly how many times the pair has worked
together. `HAVING COUNT(*) >= 3` then keeps only the groups that
crossed the threshold, dropping actor/director combinations that
cooperated fewer times without needing a separate filtering step.
Because `timestamp` is the table's primary key, every row is a distinct
event, so a plain `COUNT(*)` is already the right measure — there is no
duplicate-row case to collapse with `DISTINCT`.

Each `ActorDirector` row is read once and folds into its
`(actor_id, director_id)` group, so with hash grouping the query runs
in one linear sweep over the table (sort-based plans add a log
factor).

**Complexity:** `O(N)` time and `O(P)` space, for `N` ActorDirector
rows and `P` distinct (actor_id, director_id) pairs.
