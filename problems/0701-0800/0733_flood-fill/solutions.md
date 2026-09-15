# Solutions — Flood Fill

## Flood the component with an explicit queue

The fill must reach exactly the pixels 4-directionally connected to the seed
that carry the seed's ORIGINAL color — not every pixel of that value, and not
even pixels of the target color already sitting next door. Growing the region
with an explicit queue keeps that boundary honest: recolor the seed, then
repeatedly dequeue a pixel and recolor each of its up, down, left and right
neighbours that still holds the original color. A pixel already recolored no
longer matches, so writing the new color as a pixel enters the queue is both
the fill and the seen-mark — no pixel is ever enqueued twice, and the spread
stops by itself at the component's edge.

One guard comes first. When the seed's color already equals `color`, the
crawl's own second example makes the fill a no-op, and returning the image
unchanged also keeps the loop's matching condition meaningful — recoloring
anyway would leave nothing to compare against, and an unguarded fill would
then spin forever re-finding the same pixels.

The queue, not recursion, is the load-bearing choice. A recursive fill walks
the component as a call chain, and nothing in the constraints bounds that
chain's length: a serpentine component can snake through most of a `50 x 50`
grid, chaining well over a thousand pixels deep — past any call stack a
submission is granted, in every language here. The explicit queue holds that
depth on the heap instead, where the whole grid fits trivially. Each pixel is
dequeued once and probed as a neighbour at most four times, so the whole fill
is linear in the grid.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
