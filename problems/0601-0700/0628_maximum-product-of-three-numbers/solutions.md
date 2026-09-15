# Solutions — Maximum Product of Three Numbers

## Two candidates, one scan

Only two triples can possibly hold the maximum. A winning product that is
positive has either no negative factors — three values best chosen as the
three largest — or exactly two of them, whose product is a positive the
array's biggest value should multiply: the largest value times the two
smallest. When no positive product exists, the least-bad triple is the
three values closest to zero, which is the three largest again. So the
answer is the better of `max1 * max2 * max3` and `min1 * min2 * max1`, and
no other triple needs considering.

A sort exposes those five extremes, but they are just five running values:
one pass maintains the three largest and the two smallest — the `>=` shifts
let duplicates count with multiplicity, so `[5,5,5]` correctly yields
`125` — and a final comparison closes it. No scratch memory, no reordering.

Every value is bounded by 1000 in magnitude, so each candidate product sits
within `10^9` — inside 32-bit range (`2^31 - 1` is about `2.15 * 10^9`),
nothing can overflow even at the extremes. The fixed-width languages still
form the two candidates in 64 bits before the final cast, per the house
rule.

**Complexity:** `O(n)` time, `O(1)` space.
