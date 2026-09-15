# Solutions — Number of Islands

Two equivalent flood-fill approaches; both visit every land cell once, so
they differ only in the order the cells are explored and the constants of
the container used.

## BFS

Explore each island level by level with a queue. When an unvisited land
cell is found, it seeds a new island: enqueue it, mark it visited, and
repeatedly dequeue a cell and enqueue its unvisited land neighbors
(marking each on enqueue so nothing enters the queue twice). The flood
stops when the queue drains — the whole connected landmass is accounted
for, and the scan continues looking for the next unvisited land cell.

**Complexity:** `O(m·n)` time — each cell is enqueued at most once and
each edge is examined a constant number of times. `O(min(m, n))` extra
space for the queue in the worst case (a diagonal island keeps the queue
short; a full grid keeps it at the smaller dimension's front).

## DFS

Same flood fill, different frontier discipline: a stack. Seeding works
identically, but the exploration pushes a cell's neighbors and
immediately digs into the most recently pushed one, so a single island is
carved in one depth-first sweep before returning to the seed's other
neighbors. Implemented iteratively (an explicit stack) so a 300×300
all-land grid cannot overflow the call stack.

**Complexity:** `O(m·n)` time, `O(m·n)` extra space in the worst case —
the stack can hold an entire landmass before it starts draining.
