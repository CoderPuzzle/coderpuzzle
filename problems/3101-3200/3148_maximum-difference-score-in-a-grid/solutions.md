# Solutions — Maximum Difference Score in a Grid

The movement rule hides a telescoping gift. Whatever winding sequence of
down-and-right hops a journey takes, consecutive moves share endpoint and
start, so every intermediate value cancels and the whole trip is worth
`grid[end] - grid[start]` — exactly what the first hint states. The problem
therefore shrinks to a single question over cell pairs: maximize
`grid[end] - grid[start]` where `end` lies strictly below or strictly to the
right of `start` (componentwise), never equal to it — which also honors the
"at least one move" requirement.

## Prefix-rectangle minima in one sweep

For each cell treated as an end, its legal starts form a rectangle: the
columns up to its own in every row above it, plus its own row's cells to
the left — everything it can reach minus itself. A row-major sweep
computes that set's minimum on the fly: carry `prefixMin[r][c]`, the minimum
value anywhere on rows `0..r` within columns `0..c`, built from the entry
directly above, plus a running left-to-right row minimum; subtracting the
rectangle-minus-self minimum from the current cell prices every start for
this end in constant time, and the largest price across the matrix is the
answer. Seeding row `0`'s rectangle entries with an out-of-range sentinel
keeps the very first cells honest until a real pair appears.

Two precision notes. First, answers are bounded by the value range — no
journey can score outside `±(10⁵ − 1)` — so the arithmetic itself fits in
32 bits and 64-bit accumulators simply honor the declared wide return;
JavaScript values sit orders of magnitude below `2^53`, where `Number` stays
exact. Second, care is the entire difficulty here: scanning with one global
running minimum misfires, because a small value to the _left_ in an earlier
row can sit at a column the current end cannot reach (moves only go right),
inflating answers that are geometrically impossible.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
