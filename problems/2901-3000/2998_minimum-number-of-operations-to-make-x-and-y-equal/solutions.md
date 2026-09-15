# Solutions — Minimum Number of Operations to Make X and Y Equal

Treat every value x can take as a graph node and the four operations as
unit-cost edges; the answer is then a shortest path from x to y, which
makes breadth-first search the natural tool. The only design question is
how far the search is allowed to wander, since the raw graph is infinite
in the increment direction.

## Bounded breadth-first search over values

Two observations fence the state space in. First, only the increment
edge ever raises the value, so when `y >= x` any path needs at least
`y - x` increments and that many suffice — the answer is exactly `y - x`
and no search is required. Second, when `y < x`, the plain decrement run
already solves the problem in `x - y` steps, so an optimal path never
climbs above `x + (x - y)`: reaching past that point would spend more
increments than the whole decrement alternative. With `1 <= x, y <= 10⁴`
the ceiling stays below `2 · 10⁴ + 10`, a fixed array of distances.

BFS from `x` over `[1, limit]` with neighbors `v - 1`, `v + 1`, and the
divisions `v / 11` and `v / 5` when they divide evenly dequeues states in
nondecreasing operation count, so the moment `y` leaves the queue its
layer index is optimal. A flat distance array doubles as the visited
mark, the queue is a plain array with a moving head, and the whole
procedure is iterative — no recursion anywhere. Distances are bounded by
`x - y <= 9999`, comfortably inside 32-bit integers.

**Complexity:** `O(x)` time, `O(x)` space.
