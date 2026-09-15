# Solutions — Walking Robot Simulation

Nothing about this problem needs to be deduced — the command list already is
the walk, so the whole task is to replay it faithfully and watch where the
robot gets. Only two questions come up per unit move: which cell lies one step
ahead under the current heading, and whether that cell is an obstacle. Both are
cheap once the headings cycle through four fixed directions and the obstacles
sit in a hash set.

## Replay the walk over a hashed obstacle set

Represent the heading as an index into the four cardinal directions in
clockwise order — north, east, south, west — so a right turn is `+1` and a left
turn `+3`, taken mod 4. A forward command `k` then executes as `k` unit moves:
before each one, compute the neighboring cell in the current heading and look
it up among the obstacles; a hit stops that command immediately with the robot
still on the adjacent cell, which is exactly the stated blocking rule. This
unit-by-unit rule also settles the origin note for free — an obstacle only ever
blocks _entering_ a cell, so a robot that starts on the obstacle at (0, 0)
walks off it but can never step back in.

The obstacle list becomes a hash set once, before the walk. Where a language
hashes composite keys directly (tuples, pairs, two-element arrays) the set
holds those; otherwise each cell `(x, y)` folds into one integer key `x * K +
y` with `K` chosen larger than twice the furthest reachable coordinate — at
most `9 × 10⁴`, since `10⁴` commands move at most 9 units each — so no two
distinct cells share a key. The running answer updates after every unit move,
not once per command, because the maximum is over the whole path in time: a
turn back toward the origin can shrink the distance again, leaving the best
point somewhere in the middle of the run. Squared distances peak at
`2 × (3 × 10⁴)² = 1.8 × 10⁹`, just inside 32-bit range; the fixed-width
solutions accumulate the square in a 64-bit value and narrow it at return,
keeping a comfortable margin under the guaranteed bound.

**Complexity:** `O(n + m)` time, `O(m)` space.
