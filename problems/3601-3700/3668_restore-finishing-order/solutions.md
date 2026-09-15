# Solutions — Restore Finishing Order

## Set-filtered pass over the finishing order

Everything the answer needs already sits inside `order`. The `friends` array
is ordered by ID and says nothing about placement — the race's own sequence
dictates every position. So this is a filtering job, not a sorting one: walk
`order` once and keep exactly the entries that belong to your friends.
Because the scan follows the race itself, the kept IDs emerge in finishing
order with no rearrangement step afterwards.

Classifying each position means a membership test against the friend roster,
and the roster is capped at eight IDs. Copying it into a hash set up front
makes every test constant time on average, so the sweep stays linear however
the two inputs interleave. The strictly-increasing guarantee on `friends`
never gets used — the set is equally content with any arrangement — while
the guarantee that every friend appears somewhere in `order` promises the
output holds exactly as many entries as the roster.

With `n <= 100` any membership structure fits comfortably, but this shape is
the general one: build the bounded set in one pass, sweep the sequence in
another, append survivors. The only auxiliary storage beyond the answer is
that constant-size set.

**Complexity:** `O(n)` time, `O(1)` space.
