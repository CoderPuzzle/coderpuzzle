# Solutions — Max Area of Island

## Flood fill each island with an explicit queue

A row-major sweep meets every island exactly once — at the first land cell the
scan reaches — so the answer is the largest flood that can be grown from any of
those starts. Flooding from a start cell reaches exactly the land connected to
it 4-directionally: enqueue the start, then dequeue a cell, count it, and
enqueue each of its up, down, left and right neighbours that is unvisited land.
Marking a cell visited when it enters the queue rather than when it leaves is
the detail that keeps the count honest — otherwise the same cell can sit in the
queue twice and be counted twice.

The queue, not recursion, is the load-bearing choice. A recursive fill walks
the component as a call chain, and nothing in the constraints bounds that
chain's length: an island one cell wide can snake through most of a `50 x 50`
grid, chaining well over a thousand cells deep — past any call stack a
submission is granted, in every language here. The explicit queue holds that
depth on the heap instead, where the whole grid fits trivially.

Each cell is touched a constant number of times — once by the sweep, once by
its own dequeue, and at most four times as a neighbour candidate — and the
seen matrix lets each cell be enqueued at most once, so the whole pass is
linear. An island can cover at most every cell of the grid, `2500` at the
constraint ceiling, which sits far inside a 32-bit integer.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
