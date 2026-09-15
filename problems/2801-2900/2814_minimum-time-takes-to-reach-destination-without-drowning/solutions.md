# Solutions — Minimum Time Takes to Reach Destination Without Drowning

## Two breadth-first searches: flood times, then the escape

Two processes advance at one cell per second, so both can be flattened onto
a shared clock. The first BFS is multi-source: start from every `"*"` cell
at second zero and expand ring by ring, recording for each empty cell the
second the water arrives. Only empty cells ever flood, so `"S"`, `"D"` and
`"X"` keep an infinite flood time — which also makes the statement's note
("the destination will never be flooded") come out of the rules rather than
out of the data.

The second BFS walks the person. A neighbour may be entered only if it is
empty or is `"D"`, and only if the arrival second `t + 1` is strictly
smaller than that cell's flood time: stepping onto a cell in the same
second it floods drowns, and already-flooded ground has a flood time no
later than any future step, so a single strict comparison covers both
bullet points. BFS layers equal seconds here as well, because every move
costs exactly one; the first time the destination leaves the queue, its
time is minimal, and the answer is `-1` when the frontier drains instead.

Grid sizes are bounded by 100 * 100 = 10⁴ cells, times stay below 10⁴, and
both passes visit every cell once, so plain arrays and queues are enough.

**Complexity:** `O(n*m)` time, `O(n*m)` space.
