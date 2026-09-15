# Solutions — Special Permutations

## Bitmask Dynamic Programming

With `n <= 14`, the whole permutation can be described by which indices are already placed and which one landed last, suggesting `dp[mask][last]`: the number of ways to arrange exactly the indices in `mask` so that they end with `last` and every adjacent pair already satisfies the divisibility condition. The singletons seed the table with 1, and the answer is the sum of `dp[full][last]` over all possible final elements.

Transitions push forward rather than pull: from a live state `(mask, last)`, any unused index `nxt` may be appended when `nums[last]` and `nums[nxt]` divide one another — checked symmetrically, since the condition is `nums[last] % nums[nxt] == 0` or `nums[nxt] % nums[last] == 0` — and its ways accumulate into `(mask | 1 << nxt, nxt)`. Any ordering satisfying the full condition decomposes uniquely into such steps, so every special permutation is counted exactly once; each addition is reduced modulo `10^9 + 7`.

Enumerating masks in increasing order guarantees a state is finalized before it propagates, and zero-way states are skipped cheaply. The three nested loops over mask, last, and next give `2^n * n^2` transitions — about 3.2 million at `n = 14`.

**Complexity:** `O(2^n * n^2)` time, `O(2^n * n)` space.
