# Solutions — Minimum Cost to Split into Ones

## Count pairs of final pieces

Think of the result as `n` distinct unit pieces. Whenever a piece containing `a + b` units is split into groups of sizes `a` and `b`, the operation charges `a * b`, exactly one for every pair whose units are separated between the two new groups. Each unordered pair of final unit pieces is separated exactly once in any complete split tree: at the first split that sends its two units to different children.

Therefore every possible sequence of splits has the same total cost, namely the number of unordered pairs of units. This is `n * (n - 1) / 2`; in particular, repeatedly splitting `x` into `1` and `x - 1` attains that cost.

**Complexity:** `O(1)` time, `O(1)` space.
