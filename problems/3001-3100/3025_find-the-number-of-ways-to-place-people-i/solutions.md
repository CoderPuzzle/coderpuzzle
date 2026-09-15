# Solutions — Find the Number of Ways to Place People I

## Sort by x, sweep each anchor with a shrinking y-window

A pair is counted once its upper-left end `A` and lower-right end `B` are
named: `A` needs `x_A <= x_B` and `y_A >= y_B` — equal coordinates allowed,
so degenerate rectangles (lines) count — and no other point may lie in the
closed rectangle they span. Distinctness makes the roles unambiguous, so
sorting the points by x ascending, breaking ties by y descending, puts both
ends of every pair in a fixed order: each point can only anchor pairs whose
other end comes later in the array.

For an anchor `i`, scanning candidates `j` in that order makes containment
a purely vertical question: every previously scanned point `k` already has
`x_i <= x_k <= x_j`, so candidate `B_j` is valid exactly when no scanned
point's y falls inside `[y_j, y_i]`. The scan tracks `best`, the largest y
among candidates accepted so far. Any scanned point that was rejected was
rejected because some earlier point with y at least as large was accepted,
so `best` dominates it; conversely every accepted point lies inside the
rectangle. Hence the single test `y_i >= y_j > best` accepts precisely the
valid partners, and the whole count is two nested passes over the sorted
array.

**Complexity:** `O(n^2)` time, `O(1)` space.
