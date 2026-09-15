# Solutions — Snakes and Ladders

Every move is one free choice among at most six forward destinations followed
by one forced teleport, so the game is an unweighted shortest-path search in
disguise: squares are nodes, dice rolls are edges of cost exactly 1, and the
answer is the fewest edges on a path from square 1 to square n². Snakes and
ladders never add to the move count — each merely redirects where a roll
lands — so the teleport belongs inside the edge, and the statement's range
`[curr + 1, min(curr + 6, n²)]` caps every edge's far end at n² with no
overshoot to handle.

## Breadth-first search on the flattened board

Flatten `board` into a one-dimensional table `cells[1..n²]` with the
boustrophedon walk itself: read the bottom row left to right, the row above it
right to left, and keep flipping direction to the top row. A roll nominally
landing on square `s` then resolves to `cells[s]` when that entry is not `-1`
and to `s` otherwise — exactly one mandatory teleport. Folding the teleport
into edge construction also settles the no-chaining rule for free: wherever a
ladder drops the token, that square is enqueued as an ordinary node, and the
table is never consulted a second time for the same roll.

A level-by-level breadth-first search from square 1 then reads off the answer:
expand every square of the current level through its at-most-six edges, and
the first level whose expansions resolve to square n² is the move count. A
visited array marks each square as it enters a level, so a square is expanded
once even when snakes keep funneling play back through the same corridor —
with strictly forward rolls, revisiting a square can never improve on its
first, earliest level. Each square contributes at most six edges, so the
whole search does constant work per cell; if a level ever arrives empty,
square n² is unreachable and the answer is `-1`.

**Complexity:** `O(n²)` time, `O(n²)` space.
