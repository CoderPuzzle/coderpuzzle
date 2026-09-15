# Solutions — Minimum Initial Strength to Defeat All Monsters

## Difference Array Sweep with a Closed-Form Maximum

The only quantity that matters at monster `i` is the fighter's current
strength, and the fight rules pin it down: starting from initial strength
`S`, the strength before monster `i` equals `max(0, S - P_i)`, where `P_i`
is the sum of the strengths of all earlier monsters. Each fight subtracts
the monster's strength and then clamps at zero, so the total lost never
exceeds that prefix sum no matter how often the clamp fires.

A difference array collapses the overlapping boost ranges into a per-index
total: for every boost `[l, r, v]`, add `+v` at `l` and `-v` at `r + 1`,
then one running sum recovers `bonus[i]`, the combined temporary bonus
while fighting monster `i`. Defeating monster `i` requires
`max(0, S - P_i) + bonus[i] >= monsters[i]`: whenever
`bonus[i] >= monsters[i]` this holds for every `S`, and otherwise it
demands exactly `S >= P_i + monsters[i] - bonus[i]`. The answer is the
maximum of that bound over all uncovered monsters, floored at zero for the
case where boosts carry everything.

No simulation is needed because the check at monster `i` depends on `S`
only through the fixed quantity `max(0, S - P_i)` — clamping after a cheap
fight can only help later checks, which the floor at zero already accounts
for, and surplus bonus above a monster's strength is simply wasted.

**Complexity:** `O(n + m)` time, `O(n)` space.
