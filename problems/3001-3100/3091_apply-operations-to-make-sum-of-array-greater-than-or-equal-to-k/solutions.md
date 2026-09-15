# Solutions — Apply Operations to Make Sum of Array Greater Than or Equal to k

## Enumerate the increment budget

Think about the final array rather than the operations themselves (hint 1):
if all increase operations come first and all duplicates come last, the
array ends up holding `m` copies of one value `v`, built from `[1]` with
`v - 1` increases and `m - 1` duplicates, for a total of
`(v - 1) + (m - 1)` operations and a sum of `m * v`. Mixing the two kinds —
raising a duplicate's value separately, or duplicating mid-way through the
raises — never beats this shape, because an operation spent on either move
contributes to the same product whether it happens early or late.

For a fixed `v`, the cheapest way to reach sum `k` is to take exactly as
many elements as needed: `m = ceil(k / v)`, so the duplicate count is
`ceil(k / v) - 1` whenever that is positive. The answer is therefore the
minimum over every candidate value `v` in `1..k` of
`(v - 1) + max(0, ceil(k / v) - 1)` (hint 2). Values above `k` are never
useful — they already cost more than the all-increments plan of `k - 1`
operations — so the loop needs no ceiling beyond `k`.

**Complexity:** `O(k)` time, `O(1)` space.
