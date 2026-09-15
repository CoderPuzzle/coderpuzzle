# Solutions — 01 Matrix

Two routes to the same distance grid. The multi-source sweep lets every
zero broadcast outward and reads each cell's answer off the first
wavefront to arrive; the two-pass recurrence never searches at all — it
settles the grid in place, twice, each cell taking one plus the best of
two already-settled neighbours. A queue and a wavefront against four
arithmetic operations per cell.

## Multi-Source BFS

Asking for each cell's distance to the nearest zero becomes much cheaper when asked in reverse: instead of searching outward from every `1` (which repeats work across overlapping searches), all `0` cells broadcast simultaneously. A single BFS starts with every zero already in the queue at distance 0, and the wavefront expands in unit steps over the four orthogonal neighbors — so the first time any wave reaches a cell, it has arrived via a shortest path from its nearest zero.

![The example grid colored by BFS distance from the zero cells: five sources start at distance 0 (dark accent), the first ring resolves at distance 1, and the bottom corner at distance 2, giving the last row 1, 2, 1.](figures/solution-wavefront.svg)

The implementation marks distances in place: `dist` starts as `None` everywhere, every `mat[i][j] == 0` cell is seeded with 0 and enqueued, and a cell is relaxed only while its distance is still `None`, which doubles as the visited check. Setting the distance before enqueueing (rather than at dequeue time) is what prevents duplicate queue entries, so each cell enters the queue exactly once and the whole traversal is linear in the number of cells. Zero cells themselves are already correct at 0 and are never overwritten.

Correctness rests on the BFS invariant: cells are dequeued in non-decreasing distance order, so when a `None` neighbor is first assigned `dist + 1`, no shorter path to it can appear later. The guarantee of at least one zero seeds the queue, and the `None` check makes walls of `1`s simply resolve at their wavefront distance. The output matrix and the queue, which at peak holds no more than the perimeter of the current wavefront, are both bounded by the grid size.

**Complexity:** `O(m·n)` time, `O(m·n)` space.

## Two-Pass DP

Every distance here is defined by a neighbour: a cell sits exactly one
step farther from the nearest zero than the cell you would walk to next
on the way there. That is a recurrence, and it needs no queue — only a
visiting order in which the neighbours it reads are already settled.

No single sweep provides that order, because a cell's nearest zero can lie
in any of four directions. Two do: one pass from the top-left inwards,
each cell taking one plus the smaller of its top and left neighbours, then
one pass from the bottom-right inwards doing the same with the bottom and
right neighbours. A shortest walk never doubles back on itself, so its
last step into any cell arrives from a direction one of the two sweeps
processes first — and because the second sweep starts from the first's
results, even a walk that leaves a cell heading up-and-right is priced
correctly: one leg is accounted for by each pass. Cells start at `0` when
they hold a zero, otherwise at `m·n + 1` — farther than any real distance
can reach, so an unset value relaxes harmlessly and is always overwritten
before the end.

On `mat = [[1,1,1],[1,1,0]]` the forward pass is all formality: the lone
zero sits below and right of everything, so every other cell stays at the
sentinel. The backward pass then does the real work, walking the bottom
row to `2, 1, 0` and the top row to `3, 2, 1`, one relaxation at a
time.

Both sweeps touch every cell once and do constant work there, and the
relaxations overwrite the distance grid in place — nothing is queued,
ordered, or remembered beyond the answer itself.

**Complexity:** `O(m·n)` time, `O(1)` space beyond the returned grid.
