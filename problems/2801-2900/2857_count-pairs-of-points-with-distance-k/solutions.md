# Solutions — Count Pairs of Points With Distance k

## Split the distance across XOR components

The distance `(x1 XOR x2) + (y1 XOR y2)` mixes two independent XOR values that
must sum to exactly `k`. Enumerate every way to write `k` as a sum
`split + (k - split)` with `0 <= split <= k`; a point `j` then pairs with an
earlier point `i` precisely when `xj == xi XOR split` and
`yj == yi XOR (k - split)`, because XOR lets us reconstruct both partners from
one side of the pair.

Scan the points once, carrying a hash map from point to frequency. For each new
point, probe the map for all `k + 1` reconstructed partners and add their
counts — every match found this way corresponds to a distinct earlier index, so
each unordered pair `(i, j)` is counted exactly once. Then record the current
point. Each coordinate fits in 20 bits (`10⁶ < 2²⁰`), so a point packs into a
single key and each partner probe is one XOR with `(split << 20) | (k - split)`.

**Complexity:** `O(n * k)` time, `O(n)` space.
