# Solutions — Maximize Total Cost of Alternating Subarrays

## Take-or-flip rolling DP

A subarray's cost alternates signs from its head, so within one segment
each element arrives either phase-plus or phase-minus, and a new segment
always starts phase-plus at its first element. Splitting therefore matters
only to give some element a fresh plus sign — equivalently (as hint 2
observes) we choose elements to flip to negative, no two adjacent and never
the first. That observation collapses every possible segmentation into two
states per position.

Running left to right with hint 4's recurrences — `keep[i]`, the best total
when element `i` enters phase-plus (restarting costs nothing special: the
best prefix state simply carries over), and `flip[i]`, best when element
`i` is negated, which is only reachable from `keep[i − 1]` — needs just the
previous pair, seeded exactly as hint 5 prescribes for the first two
elements (`n = 1` short-circuits). The answer is the better of the two
final states.

Magnitudes are honest 64-bit territory: the absolute total can never beat
`sum |nums[i]| <= 10⁵ · 10⁹ = 10¹⁴`, far past 32-bit range yet well under
JavaScript's exact-integer ceiling `2⁵³`, which is why Java/C++/Go/Rust
accumulate in `long`/`long long`/`int64`/`i64` while JS relies on plain
Numbers staying exact.

**Complexity:** `O(n)` time, `O(1)` space.
