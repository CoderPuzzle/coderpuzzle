# Solutions — Final Array State After K Multiplication Operations II

## Simulate to the crossover, then hand out exponents

A min-heap of `(value, index)` pairs replays the affordable prefix of the
process directly: while operations remain and the smallest value times
`multiplier` still fits inside `max(nums)`, pop that minimum and push it back
multiplied. The guard costs nothing in fidelity — a replacement only lands
when it cannot exceed the maximum, so no value ever leaves the original
range during this phase and the maximum itself never moves. Each element can
therefore be multiplied fewer than `log₂ max(nums) ≈ 30` times before its
next multiplication would break the guard, which caps the whole simulated
prefix at about `30n` heap rounds even for `k = 10⁹`. When `multiplier = 1`
no value ever grows and the state never moves, so the answer is just the
input modulo `10⁹ + 7`.

The simulation stops at the first minimum whose product with `multiplier`
exceeds the maximum, and from that moment the operations fall into a fixed
cycle. Multiplying the smallest makes it strictly larger than every other
value, so the next operation takes the second smallest, then the third, and
so on through the entries in non-decreasing `(value, index)` order — an
entry already multiplied stays strictly above every entry not yet multiplied
precisely because even `min * multiplier > max`. After one full sweep every
value has been scaled by `multiplier`, which preserves both the ordering and
the crossover inequality itself, so each further round repeats identically.
The remaining `r` operations therefore hand out `q = r // n` multiplications
to every element plus one extra to the first `r % n` entries in that sorted
order.

Each element finally evaluates `v · multiplier^e mod 10⁹ + 7` with fast
modular exponentiation. Crossover products reach `10⁹ · 10⁶ = 10¹⁵`, so
Java, C++, Go, and Rust compute them in 64-bit integers; JavaScript's
phase values stay below `10⁹` and its crossover products below `2⁵³` are
exact as Numbers, but modular squaring steps do exceed that range, so they
run on BigInt.

**Complexity:** `O(n log n + n log k)` time, `O(n)` space.
