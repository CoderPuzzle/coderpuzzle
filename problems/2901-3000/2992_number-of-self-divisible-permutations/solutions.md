# Solutions — Number of Self-Divisible Permutations

## Bitmask dynamic programming

A valid arrangement is a perfect matching between 1-indexed positions and the
values `1..n` where position `i` accepts value `v` only when `gcd(v, i) == 1`.
With `n <= 12` there are at most 4096 sets of values, so the matching can be
counted by dynamic programming over those sets: `dp[mask]` is the number of
ways to fill the first `popcount(mask)` positions using exactly the values
collected in `mask`. The position a state is filling is read off the mask
itself, which is what lets a flat array hold the whole table.

Transitions peel the last-placed value off the mask: `dp[mask]` sums
`dp[mask ^ (1 << v)]` over every `v` in `mask` whose compatibility with
position `popcount(mask)` holds, with the compatibility grid precomputed once
by Euclid's algorithm so the inner loop is pure table lookups. `dp[0] = 1`
seeds the recursion, and `dp[(1 << n) - 1]` — every value placed — is the
answer. Each state is visited exactly once, in increasing mask order, so no
memoization search is needed and the code is a pair of plain loops.

**Complexity:** `O(2ⁿ · n)` time, `O(2ⁿ)` space.
