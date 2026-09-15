# Solutions — Binary Subarrays With Sum

A subarray's sum is a difference of two prefix sums, so counting windows
with sum `goal` is really counting pairs of positions whose prefix sums
differ by exactly `goal` — and pairing questions are what a hash map
settles in constant time per element.

## Prefix sums in a hash map, one sweep

Sweep `nums` once carrying `prefix`, the sum of everything already visited.
A window ending at the current position has sum `goal` exactly when it
begins just after an earlier position whose prefix sum equals
`prefix - goal`, so what this step contributes is however many such
earlier prefixes exist. The map `seen` holds exactly that census, seeded
with `0 -> 1` for the empty prefix so windows starting at index 0 count
like any other; after the lookup the sweep records the current `prefix`,
guaranteeing a position only ever pairs with strictly earlier ones.

On `nums = [1,0,1,0,1]` with `goal = 2` the running prefix sums are
1, 1, 2, 2, 3. The third element closes `[1,0,1]` against the empty
prefix, the fourth closes `[1,0,1,0]` the same way, and the fifth, with
prefix 3, pairs with the two earlier prefixes worth 1, closing `[0,1,0,1]`
and `[1,0,1]` — four in total. Duplicate prefix sums are exactly what the
counts in the map price, and `goal = 0` needs no special case:
`prefix - 0 = prefix` pairs each position with every earlier occurrence of
the same running sum, which is precisely the 15 all-zero windows of the
second example.

**Complexity:** `O(n)` time, `O(n)` space.
