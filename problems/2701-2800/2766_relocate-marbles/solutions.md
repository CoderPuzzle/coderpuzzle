# Solutions — Relocate Marbles

## Occupied-position set simulation

Only occupancy matters, so the whole state fits in a set of positions seeded
from `nums`. Collapsing duplicate starting positions loses nothing: a move
relocates _all_ marbles sitting on `moveFrom[i]` at once, so a position
holding one marble or many behaves identically — it stays occupied until its
own move empties it, and whatever lands there afterwards reoccupies it.

Each of the `m` steps is then just two set operations: remove `moveFrom[i]`,
add `moveTo[i]`. Processing the steps in order makes chained relocations work
— marbles an earlier step brought onto B are exactly the ones a later step
sweeps off to C. Removing before adding makes a self-move (`moveFrom[i] ==
moveTo[i]`) a harmless no-op, and when several sources funnel into one target
the adds merge into a single occupied entry, which is precisely the Example 2
collapse.

After the last step the set holds exactly the occupied positions; sorting it
ascending produces the required answer.

**Complexity:** `O((n + m) log(n + m))` time, `O(n + m)` space.
