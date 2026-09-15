# Solutions — Minimum Cost to Split into Ones II

## Count separated pairs

When a piece of size `x` is split into pieces of sizes `a` and `b`, its cost
`a * b` counts all pairs containing one final one from each side. Those pairs
are separated by this split, while pairs within either side remain together.

Every unordered pair among the `n` final ones is separated exactly once: at
the first split that puts its members on different sides. Therefore every
valid sequence of operations has total cost equal to the number of such pairs,
`n * (n - 1) / 2`. The multiplication uses 64-bit integers because the answer
can exceed the signed 32-bit range.

**Complexity:** `O(1)` time, `O(1)` space.
