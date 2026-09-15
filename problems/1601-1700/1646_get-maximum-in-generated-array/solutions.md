# Solutions — Get Maximum in Generated Array

## Build the array and scan

The rule is a direct recipe for filling an array of length `n + 1` from
the bottom up: seed `nums[0] = 0` and `nums[1] = 1`, then walk every
remaining index `i` from `2` to `n` in order. Because each rule only
reaches backward — `nums[2 * i]` and `nums[2 * i + 1]` depend on `nums[i]`
and `nums[i + 1]`, both strictly smaller than `2 * i` — filling indices in
increasing order guarantees every value a later index needs has already
been computed. Splitting on parity of the current index `i` tells us
which of the two rules produced it: even `i` came from `nums[i / 2]`,
odd `i` came from `nums[i / 2] + nums[i / 2 + 1]` (using integer
division).

A running maximum, updated alongside each write (and seeded from
`nums[0]` and `nums[1]`), avoids a second pass over the array. The `n = 0`
case is handled separately since the array is then just `[0]` and there
is no `nums[1]` slot to fill.

**Complexity:** `O(n)` time, `O(n)` space.
