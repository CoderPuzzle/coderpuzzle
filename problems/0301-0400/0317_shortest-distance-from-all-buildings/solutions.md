# Solutions — Shortest Distance from All Buildings

## BFS from every building

A house site is valid only if a path of empty land connects it to every
building, and the travel distance along that path is what must be summed — not
the free-flight Manhattan distance. Distances through a maze are shortest
paths, so the search is a BFS, and running it once per building instead of
once per candidate cell turns `(mn)^2` searches into `B` searches: every
building floods the whole empty region around it a single time.

Each flood adds its layer distances into a running `dist_sum` grid and
increments a companion `reach` count on every cell it touches. A cell that
some building's flood never met — a pocket opened only into another building's
flank, or land across an unbroken wall — keeps a partial count, and the final
scan insists on `reach == B` before comparing totals. That filter is the heart
of the problem: a sealed pocket next to one building scores a deceptively
small sum that no valid house site can use. If no cell qualifies, the answer
is `-1`.

Both accumulators are `m x n` grids and the queue holds at most that many
cells, so the extra space is a constant number of grids. At the constraint
ceiling the answer stays small: a `50 x 50` grid puts every cell at distance
at most `m + n - 2 = 98` from any building, and even `2500` buildings summing
onto one cell cannot exceed `245000` — far inside a 32-bit integer.

**Complexity:** `O(B * mn)` time, where `B` is the number of buildings;
`O(mn)` space.
