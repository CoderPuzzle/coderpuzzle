# Solutions — Minimum Time to Complete All Deliveries

## Binary search on the total time

Whether every delivery fits inside a horizon of `T` hours is a monotone
question: growing `T` only ever adds working hours, never removes them. For
a fixed `T` the fit is decided by three counting conditions — drone 1 needs
`d[0] <= T - floor(T / r[0])` usable hours, drone 2 needs its analogue, and
the combined load must fit into the `T - floor(T / lcm(r[0], r[1]))` hours
in which at least one drone is awake, since the multiples of the least
common multiple block both drones at once. The conditions are also
sufficient: park each delivery in an hour only its own drone can use first,
then pour whatever remains into the doubly-available hours, which is
exactly the slack the inequalities leave.

The least common multiple comes from a gcd, dividing before multiplying;
with `ri <= 3 · 10⁴` it never exceeds `9 · 10⁸`. A horizon that surely fits
everything is `2 · (d[0] + d[1])`: every period is at least 2, so at most
half of any horizon's hours are blocked, and the surviving half of
`2 · (d[0] + d[1])` covers the whole load. Halving that range settles the
smallest feasible horizon in about 32 constant-time probes.

Every quantity involved reaches past 32 bits — when both periods are 2 and
both demands sit at `10⁹`, the answer approaches `4 · 10⁹` — so the search
bounds, the hour counts, and the return value all live in 64-bit
arithmetic throughout.

**Complexity:** `O(log(d[0] + d[1]))` time, `O(1)` space.
