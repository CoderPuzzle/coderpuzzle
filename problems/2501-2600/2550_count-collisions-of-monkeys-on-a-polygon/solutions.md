# Solutions — Count Collisions of Monkeys on a Polygon

Two monkeys per vertex and two directions each give `2ⁿ` movements — far
too many to simulate at `n = 10⁹` — but the collisions-dominated
complement collapses to a single closed form, exactly as the statement's
hint suggests.

## Count the non-colliding movements

In a collision-free movement no two neighbours can move toward each
other, or they would meet head-on on their shared edge. So if some
monkey moves clockwise, its clockwise neighbour cannot move
anticlockwise; the "all clockwise" property propagates around the cycle,
and symmetrically for anticlockwise. The only collision-free movements
are therefore the two unanimous rotations — and they are genuinely safe,
since every monkey lands on a distinct vertex and every edge carries at
most one traveller. Exactly `2ⁿ − 2` of the `2ⁿ` movements produce at
least one collision.

Computing `(2ⁿ − 2) mod 10⁹ + 7` needs fast modular exponentiation with
`n` up to `10⁹`: the exponent loop halves the exponent each round and is
fully iterative (no recursion depth anywhere). Python's three-argument
`pow` covers it natively; the typed languages square into 64-bit types,
whose ~9.2·10¹⁸ ceiling dwarfs any `(10⁹)² ≈ 10¹⁸` intermediate.
JavaScript/TypeScript numbers cannot hold those products below `2⁵³`,
so both use an add-doubling ("peasant") mul-mod in which every
intermediate stays under `2³¹` — exact by construction, no `BigInt`
needed.

**Complexity:** `O(log n)` time, `O(1)` space.
