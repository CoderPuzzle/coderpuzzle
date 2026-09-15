# Solutions — Categorize Box According to Criteria

## Direct condition evaluation

The category follows from two independent predicates: the box is Bulky
when any dimension reaches `10⁴` or its volume reaches `10⁹`, and Heavy
when its mass reaches `100`. Computing both booleans first, then
resolving their four combinations (`Both`, `Bulky`, `Heavy`,
`Neither`), keeps each threshold visible in one place and avoids any
accidental short-circuit between unrelated criteria.

The only trap is numeric range. Dimensions are bounded by `10⁵`, so a
legitimate volume can reach `10¹⁵` — roughly five hundred times past
32-bit range — making it wrong to compute the product in 32-bit
arithmetic even though every input fits an int. The product is therefore
taken in 64-bit in every fixed-width language; JavaScript needs no such
widening because `10^15 < 2^53`, and Number multiplication of values in
this domain stays exact.

**Complexity:** `O(1)` time, `O(1)` space.
