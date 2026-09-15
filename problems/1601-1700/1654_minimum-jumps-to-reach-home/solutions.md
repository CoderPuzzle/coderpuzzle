# Solutions — Minimum Jumps to Reach Home

## Breadth-First Search with Direction State

Treat the line as a graph: every node is a pair `(position, back)`, where
`back` records that the jump just made went backward. That one bit carries
the "never twice in a row" rule — from a node with `back` set, the only
edge is the forward one to `position + a`; from any other node both edges
exist, forward to `position + a` and backward to `position - b`. An edge is
usable only when it lands on a non-negative position that `forbidden` does
not list. A breadth-first search from `(0, 0)` therefore meets the target
with the fewest jumps possible: levels are jump counts, and the first level
containing a node at `x` is the answer. If the frontier empties first, no
sequence of legal jumps reaches home and the result is `-1`.

The line stretches forward forever, so the search needs an upper bound:
nothing above `max(x, max(forbidden)) + a + b` is ever worth visiting.
Beyond `max(x, max(forbidden))` there is nothing to hit — home is below and
no forbidden cell blocks a landing — so a climb that high is purely setup
for backward jumps on the way down, and because two backward jumps cannot
be consecutive, every backward jump must be paid for by a following forward
jump. A useful overshoot therefore tops out one forward step plus one
backward reach above that line, which under the constraints keeps the
explored window at most `2000 + 2000 + 2000 = 6000` cells. The check for
`position == x` happens when a node leaves the frontier, and marking nodes
seen at enqueue time keeps each of the `2 · (limit + 1)` states in the queue
at most once.

The bookkeeping is deliberately flat: `blocked` indexes the forbidden list
into a boolean array (every forbidden value is at most the limit, so the
index is always in range), and `seen` holds the two flags per position.
Jumps, positions, and the limit all stay far below any 32-bit boundary, and
the search is a queue loop with no recursion.

**Complexity:** `O(L)` time, `O(L)` space, for `L = max(x, max(forbidden))

- a + b`.
