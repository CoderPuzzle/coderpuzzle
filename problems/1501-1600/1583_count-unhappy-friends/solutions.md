# Solutions — Count Unhappy Friends

## Rank Lookup

Checking "does `i` prefer `j` over `k`" by scanning `preferences[i]` for both
positions costs `O(n)` per question, and the unhappy test asks it twice for
every candidate `u`. Precomputing `rank[i][j]` — the position of friend `j`
in friend `i`'s preference list — turns each such question into a single
array read, since a smaller rank means a stronger preference.

With `rank` built and each friend's current `partner` recorded from `pairs`,
checking friend `x` (paired with `y`) means scanning every other friend `u`
(skipping `x` and `y` themselves) and testing whether `rank[x][u] <
rank[x][y]` — `x` prefers `u` over `y` — **and** `rank[u][x] < rank[u][v]`,
where `v` is `u`'s partner — `u` prefers `x` over `v`. The first `u` that
satisfies both marks `x` unhappy, so the inner scan stops immediately.

Building `rank` costs `O(n^2)` (each of the `n` rows has `n - 1` entries),
and the unhappy check runs the same `O(n)` scan for each of the `n` friends,
so the whole pass stays quadratic instead of the `O(n^3)` a naive
list-scanning comparison would cost.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
