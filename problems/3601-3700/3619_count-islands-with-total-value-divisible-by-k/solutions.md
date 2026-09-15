# Solutions — Count Islands With Total Value Divisible by K

## Breadth-first island flood fill

Every unvisited positive cell is the seed of exactly one island, so the
answer is built by sweeping the grid and, whenever a seed is found,
flood-filling its whole island while accumulating the sum of its values.
Cells are marked visited the moment they enter the queue — not when they
are dequeued — so no cell is ever enqueued twice and each island is
counted once. After the fill finishes, `sum % k == 0` decides whether
that island contributes to the answer. Water cells (`0`) are skipped by
the sweep, so every island total is positive and only whole islands are
ever tested.

The fill is an iterative queue, not a recursive DFS: a single island can
span all `10⁵` land cells, and a chain that long would overflow the
default call stacks. The queue is a flat buffer of cell indexes walked
with a head pointer, which costs `O(1)` per step with no pops or shifts.
The per-cell work is a constant four-neighbor check, so the whole grid is
touched a constant number of times.

The only width trap is the island total itself: up to `10⁵` cells of
`10⁶` each give `10¹¹`, which overflows 32 bits, so the fixed-width
languages accumulate in 64-bit integers (JavaScript's Number is exact
here because `10¹¹` sits far below `2⁵³`). The answer — a count of
islands — is at most `10⁵` and fits comfortably in 32 bits.

**Complexity:** `O(m · n)` time, `O(m · n)` space.
