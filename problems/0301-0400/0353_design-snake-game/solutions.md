# Solutions — Design Snake Game

## Body deque plus occupied-cell set

The snake only ever changes at its two ends, so the class keeps the body
as a deque — head at the front, tail at the back — beside a hash set of
the cells it covers. `move` computes the new head from the current one,
checks it against the walls, and unless the new head is the next food,
pops the tail in the same step: the snake slides forward exactly one cell
per call, and eating is precisely the move where the tail stays put, the
body grows by one, and the score advances together with the food pointer.

Order of operations carries the one subtle rule. The tail cell is vacated
this very turn, so it leaves the set before the new head is tested
against the body — a head landing on the snake's current tail position is
legal whenever no food is eaten, which is why `R` then `L` on a length-2
snake survives. When food is eaten the tail is kept, the same landing
becomes fatal, and the collision check correctly runs against the full,
still-occupied body. Rows index `height` and columns index `width` —
`food[i] = (ri, ci)` addresses the screen row-first — and each piece is
compared only after the previous one is eaten, so later positions stay
inert until their turn. Both ends of the deque and every set operation
are constant-time work, and the body never outgrows `food.length + 1`
cells, so each of the up to `10⁴` moves costs the same regardless of how
long the game runs.

On the statement's example the snake eats at `(1, 2)` and then `(0, 1)`,
the score reads `0, 0, 1, 1, 2`, and the final `U` steps the head to row
`-1` — a wall hit, so the answer is `-1` and the game ends.

**Complexity:** `O(1)` time per move amortized; `O(food.length)` space.
