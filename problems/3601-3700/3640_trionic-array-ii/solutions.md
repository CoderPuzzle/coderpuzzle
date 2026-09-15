# Solutions — Trionic Array II

## Slope-state dynamic programming

Treat a trionic subarray as three slopes — climb, descent, climb — each
spanning at least two elements, and scan `nums` once while carrying, for
subarrays ending at the current element, the best sum achieved in three
situations: `s0`, inside the first climb (at least two elements, may still
grow); `s1`, past a finished climb and currently descending (the peak plus at
least one lower element are committed); and `s2`, a complete
climb-descent-climb shape whose final climb is underway. A strict rise lets
`s0` extend from the previous element — whether that element ended a longer
climb or stands alone — and lets `s2` continue itself or absorb a finished
descent. A strict fall symmetrically lets `s1` continue itself or open from a
finished climb. Equal neighbors reset every state, because strictness is
broken on both sides of them.

The guards encode exactly the lengths the definition demands. Only `s0` may
rest on a single element, and it does so only as extension fuel
(`max(s0, prev)`); opening a descent from anything shorter than a two-element
climb would forge the required `l < p`, so `s1` turns solely from `s0`. Every
`s1` run already holds its peak and one lower element, so promoting it to
`s2` on a rise automatically supplies distinct valley and final-slope
elements. The answer is the largest `s2` value seen anywhere.

Each step reads the previous element's three values and writes fresh ones, so
three rolling variables replace any tables and the scan costs constant space.
Unreachable states sit on a large negative sentinel, orders of magnitude
below any real sum, and a max is taken before every addition, so they never
contaminate feasible ones. Sums are bounded by `10⁵ · 10⁹ = 10¹⁴` in
magnitude, so 64-bit accumulation is exact even though single elements fit in
32 bits.

**Complexity:** `O(n)` time, `O(1)` space.
