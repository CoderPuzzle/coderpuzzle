# Solutions — Moving Stones Until Consecutive

## Sort, then read the two gaps

Sorting the three positions into `x <= y <= z` exposes the two gaps that
matter: `y - x - 1` empty slots between the low pair, and `z - y - 1`
between the high pair. If both gaps are zero the stones are already
consecutive, so the answer is `[0, 0]`.

For the maximum, the hint's observation is the whole argument: every move
shrinks `z - x` by at least 1, and it is always possible to shrink it by
exactly 1 (nudge whichever endpoint has room into the slot next to its
neighbor). So the maximum number of moves is exactly the total number of
empty slots, `(y - x - 1) + (z - y - 1)`, i.e. `z - x - 2`.

For the minimum, one move suffices exactly when one of the two gaps is
already 0 or 1 stone-width — that is, `y - x <= 2` or `z - y <= 2` — because
then the far stone can jump directly into the remaining gap, landing the
three stones consecutively in a single move. Otherwise two moves always
suffice: move one endpoint stone to sit next to a middle stone, then move
the remaining endpoint stone to close the last gap.

**Complexity:** `O(1)` time, `O(1)` space.
