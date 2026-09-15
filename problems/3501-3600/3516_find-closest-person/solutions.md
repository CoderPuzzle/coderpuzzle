# Solutions — Find Closest Person

## Distance comparison

Both movers walk at the same speed, so who arrives first is purely a
question of who has the shorter distance to cover. Person 3 never moves, so
those distances are `|x - z|` and `|y - z|` — no simulation of the walk is
needed, the arrival order is fixed at time zero.

The method computes the two distances and returns `1` when Person 1 is
strictly closer, `2` when Person 2 is strictly closer, and `0` on a tie —
equal distances mean both step into Person 3's position on the same tick.
Only strict comparisons distinguish the three outcomes, so the equal case
must be checked explicitly rather than defaulting to either mover.

**Complexity:** `O(1)` time, `O(1)` space.
