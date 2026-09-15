# Solutions — Minimum Amount of Damage Dealt to Bob

## Sort by damage-to-time ratio

Enemy i needs t_i = ceil(health_i / power) seconds of focused attack, and during those seconds every still-alive enemy — including the one under attack — deals its damage each second. Once the kill order is fixed the total is determined: summing over the order, each enemy's damage is dealt during its own kill time plus everyone killed after it, so the total is sum of (remaining damage alive at the moment) * t_i in kill order.

Which order minimizes that? An exchange argument on adjacent kills i then j versus j then i: only the damage the later-killed enemy deals during the earlier kill changes, giving the comparison damage_i * t_j versus damage_j * t_i. Killing i first is at least as good exactly when damage_i / t_i >= damage_j / t_j, so sorting all enemies by that ratio in descending order is globally optimal. The code realizes this with a sort key of -damage / t and then simulates: accumulate remaining * t_i and retire damage_i from the running total.

The ceil division handles enemies whose health is not a multiple of power, and ties in the ratio are interchangeable — swapping them leaves the compared term equal, so any stable order works. One pass of sorting plus one linear sweep settles n up to 10⁵.

**Complexity:** `O(n log n)` time, `O(n)` space.
