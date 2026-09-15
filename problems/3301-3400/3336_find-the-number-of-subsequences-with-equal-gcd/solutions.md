# Solutions — Find the Number of Subsequences With Equal GCD

## DP over Ordered Pairs of GCD Values

Process the array once, maintaining a table `dp[g1][g2]` = the number of ways to partition the prefix processed so far into two (possibly empty) subsequences whose GCDs are `g1` and `g2`, with the convention that GCD `0` marks an empty subsequence. Each element has exactly three fates — join the first subsequence (transition to `gcd(g1, x)`), join the second (transition to `gcd(g2, x)`), or be skipped — and the update writes into a copy so each element is counted exactly once per state.

The key structural fact is that GCDs only shrink, and they live in the small universe `[0, max(nums)]` with `max(nums) ≤ 200`. That bound keeps the table at `201 × 201` states, so even though each element's transitions sweep the entire table, the work per element is bounded by roughly `4 · 10⁴` operations, independent of how many distinct values the array contains.

After processing all elements, the pairs with equal GCDs are exactly the diagonal entries `dp[g][g]` for `g ≥ 1`; the `g = 0` row and column correspond to one side being empty, which the problem excludes by requiring non-empty subsequences. Every ordered pair `(seq1, seq2)` is counted once because the DP distinguishes which side each element joined.

Edge cases: a single-element array yields zero (one side must be empty); duplicate values are handled naturally since the DP counts index-based choices, not value-based ones; modular accumulation prevents overflow of the exponentially large count.

**Complexity:** `O(n · V²)` time, `O(V²)` space, where `V = max(nums) ≤ 200`.
