# Solutions — Count Servers that Communicate

## Count per row and per column, then keep non-isolated servers

Communication is an equivalence: servers share a row or a column, directly
or through intermediaries. A server talks to somebody exactly when its row
holds at least one other server **or** its column does — and the converse
is just as exact, since any communicating partner must share one of those
two lines. So no search is needed over the pair graph.

One pass tallies `row[r]` and `col[c]` for every server cell. A second pass
over the same cells adds one for each server whose `row[r] > 1` or
`col[c] > 1`. Servers in a fully connected block are counted once each;
isolated servers (alone in both their row and their column) fail both tests
and stay out.

**Complexity:** `O(m * n)` time for the two passes, `O(m + n)` space for
the tallies.
