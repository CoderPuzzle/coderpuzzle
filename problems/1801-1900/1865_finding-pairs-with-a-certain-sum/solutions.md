# Solutions — Finding Pairs With a Certain Sum

The asymmetry in the constraints is the whole design: `nums1` never
changes and is short (≤ 1000), while `nums2` is long but only mutated
point-wise. So maintain a frequency map over `nums2`'s values; a count
query then walks the short array once, reading off
`freq2[tot - a]` per element.

## Frequency map on nums2, scan nums1

At construction, tally every value of `nums2` into a hash map. `add`
decrements the old value's count, updates the slot, increments the new
count — three constant-time operations. `count(tot)` sums the map lookups
of `tot - a` across all of `nums1`, which multiplies each complementary
frequency into the pair total. The answer can reach
`|nums1|·|nums2| = 10⁸`, so it is accumulated in a 64-bit integer.

Each `add` costs `O(1)` and each `count` costs `O(|nums1|)` hash
operations.

**Complexity:** `O(|nums1|)` per count, `O(1)` per add, `O(|nums2|)`
space.
