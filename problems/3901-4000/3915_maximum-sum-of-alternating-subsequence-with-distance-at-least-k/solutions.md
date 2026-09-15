# Solutions — Maximum Sum of Alternating Subsequence With Distance at Least K

## Delayed DP with range-maximum trees

For every index `i`, keep two best scores: `up[i]` ends with a rise into
`nums[i]`, while `down[i]` ends with a fall. Either state may also represent
the one-element subsequence worth `nums[i]`. To form a rise, extend the best
eligible `down` state whose last value is strictly smaller; to form a fall,
extend an eligible `up` state whose last value is strictly larger.

Coordinate-compress the values and store eligible states in two
range-maximum segment trees. Before processing `i`, insert the states at
`i - k`; then the trees contain exactly indices at distance at least `k`.
A prefix query below the current rank gives the rise transition, and a suffix
query above it gives the fall transition. Strict query boundaries exclude
equal values.

Scores can reach `10⁵ * 10⁵ = 10¹⁰`, so fixed-width languages use 64-bit
integers. That bound is well below `2⁵³`, and JavaScript numbers remain exact.

**Complexity:** `O(n log n)` time, `O(n)` space.
