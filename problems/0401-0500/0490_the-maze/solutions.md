# Solutions — The Maze

## Breadth-first search over stopping positions

The ball only chooses a direction while it is at rest, so the states worth
exploring are the cells where it can stop, not every empty cell. From any
stop, each of the four rolls is deterministic — the ball travels straight
until the next cell would enter a wall or leave the grid, and the cell it
lands on is the only place it next gets a choice. The maze is therefore a
graph whose nodes are stops and whose edges are rolls, at most four leaving
each stop.

Breadth-first search explores that graph with a queue of stops and a
`stopped` mark set the moment a rest cell is first scheduled, so every stop
is expanded at most once. The destination is compared only against stops as
they are dequeued, which encodes the pass-through rule for free: the ball
may roll across the destination mid-motion, but unless it comes to rest
there it can never choose a direction from it — exactly the trap the
examples warn about. The start cell is itself a stop, since the ball begins
at rest, so a destination equal to the start is answered by the first
dequeue.

Each roll scans at most `m + n` cells before hitting something solid, and
the search expands at most `m * n` stops, so the whole traversal stays
cheap; the queue and the mark array are both bounded by the number of cells.

**Complexity:** `O(mn(m + n))` time, `O(mn)` space.
