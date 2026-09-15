# Solutions — Find Minimum Cost to Remove Array Elements

## Leftover-and-suffix dynamic programming

Because each operation removes two of the three frontmost elements, the array
never fragments: after every step what remains is an untouched suffix of
`nums` plus at most one element left behind in front of it. Encode that as a
state `(c, j)` — `nums[c]` is the leftover (`c = -1` when there is none) and
`j` is where the untouched suffix starts — and let the state's value be the
cheapest way to finish from there. An operation faces the front three
elements; whichever of the three survives becomes the next leftover while the
suffix start advances by two (by three, from a state with no leftover), so
each state branches three ways at constant cost. States where fewer than
three elements remain pay the maximum of the rest and stop.

Filling the table backwards over `j` (rows `n`, `n-1` and `n-2` as base
cases) leaves the answer at the initial state `(0, -1)`. Row `j` is only ever
read while building rows `j-2` and `j-3`, so a ring of three rows keeps the
table at linear memory while the total work stays proportional to the number
of leftover/start pairs. Costs are sums of at most 500 maxima of values up to
10⁶, so the result can reach 5 × 10⁸ and all accumulation runs in 64-bit
arithmetic.

**Complexity:** `O(n²)` time, `O(n)` space.
