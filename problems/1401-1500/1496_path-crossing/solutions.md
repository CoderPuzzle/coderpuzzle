# Solutions

The walk has at most 10⁴ steps, so any structure that answers "was this
point visited?" quickly is enough. The presented solution hashes the
coordinates into a set; a boolean grid over the reachable offset window
would do the same job with direct indexing. Either way each step costs
constant expected time.

## Hash Set of Visited Points

Keep `(x, y)` starting at the origin in a hash set. Read the path one
character at a time, moving the current point north, south, east or west.
After each move, check membership before inserting: if the new point was
already present, the path crosses itself — return true. Reaching the end
without a repeat means no crossing.

**Complexity:** `O(n)` expected time for `n` steps, `O(n)` space for the
visited set.
