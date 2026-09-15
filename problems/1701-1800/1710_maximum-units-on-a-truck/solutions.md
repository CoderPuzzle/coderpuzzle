# Solutions — Maximum Units on a Truck

Every box, whatever its type, spends exactly one unit of truck capacity, so
the slots are interchangeable and the only question a slot asks is which box
fills it. Loading every slot with the richest box still on the ground never
spends a slot on a lesser box — which is exactly what sorting the types by
units per box, descending, and filling the truck front-to-back does.

## Fill the truck from the richest type down

Sort `boxTypes` in place by units per box, descending, then walk the sorted
list carrying `remaining = truckSize`. From each type take
`take = min(count, remaining)` boxes, add `take * units` to the running
total, and spend `take` slots; stop when `remaining` hits 0 or the list runs
out. Ties among equal-units types are harmless: they price a slot
identically, so any order within a tied group produces the same total.

The exchange argument pins optimality. Take any optimal load that differs
from the greedy one: somewhere it loads a box of a poorer type while boxes of
a richer type — more units per box — stay off the truck. Swapping the poorer
box for one of those richer boxes keeps the box count at `truckSize` or
below, so feasibility is untouched, and it raises the total by the units gap.
Repeating the swap converts any optimal load into the greedy load without
ever losing units, so the greedy load is optimal too.

One bound shapes the typing: the total is at most
`1000 · 1000 · 1000 = 10⁹` units, which the 32-bit return range still
covers, though narrowly — the fixed-width languages therefore accumulate in
64-bit integers and narrow once at the return. A `truckSize` beyond the
total box count simply exhausts the list with slots to spare, taking every
type in full.

**Complexity:** `O(n log n)` time, `O(1)` extra space.
