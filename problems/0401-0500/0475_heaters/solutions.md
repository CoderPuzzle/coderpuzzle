# Solutions — Heaters

## Sort heaters, binary-search each house's nearest

Every heater shares one radius, so the least lucky house dictates it: each
house is served best by its nearest heater, the radius must at least cover
that distance, and a radius equal to the largest of those minima warms every
house by serving each from its nearest heater. Nothing else matters — which
heater covers which house never has to be decided globally, so the answer is
just the maximum over houses of the distance to the closest heater.

Sorting the heaters puts them in the order the question needs. For each house,
a binary search for the first heater at or right of it splits the line in one
step: the nearest heater is that one or the one just before, so the per-house
minimum is a single comparison of two neighbours. A house left of every
heater or right of every heater has only one neighbour to consider, which the
boundary checks handle, and a house sitting exactly on a heater finds distance
0 immediately.

Only the heaters are sorted — the houses can be visited in any order, since
the maximum is order-independent. Unsorted inputs and duplicate positions on
either side are normalized by the sort (a repeated heater changes nothing, and
a house sharing a heater's coordinate yields 0), and the scan only ever takes
differences of positions, so the `10⁹` ceiling never overflows anywhere.

**Complexity:** `O((h + n) log n)` time for `h` houses and `n` heaters,
`O(1)` extra space beyond the sort.
