# Solutions — Inverse Coin Change

## Forced greedy with a growing counting DP

The recovery is decided one amount at a time. `numWays[i]` can only be
influenced by denominations `<= i` — a larger coin never fits into amount
`i` — so scanning amounts in ascending order, the set of coins decided so
far is already the complete set of coins `<= i`, and `numWays[i]` pins down
whether `i` itself is a coin. Maintain `dp`, the unbounded-knapsack
way-counts over exactly the coins confirmed so far, with `dp[0] = 1` for the
empty selection. At amount `i`: if `dp[i]` already equals `numWays[i]`,
coin `i` cannot exist, because adding it would lift the count to
`dp[i] + 1`; if `dp[i]` is exactly one short, coin `i` must exist — a new
denomination `i` contributes `dp[i - i] = dp[0] = 1` additional way to
amount `i` — and it is folded into `dp` with the standard ascending
transition `dp[s] += dp[s - i]` for `s = i..n`, which refreshes every later
amount in one pass. Any other relationship (`dp[i]` above the target, or
two or more below it) is unreachable by either choice, so no coin set
exists and the answer is `[]`.

The scan never needs to backtrack, so a single pass settles everything:
after amount `i` is decided, `dp[i] == numWays[i]` holds by construction,
and coins are discovered in ascending order, which is exactly the sorted
order the statement asks for. The decision at each amount is a forced move
rather than a guess, which is what makes the greedy safe — there is never a
second candidate set to consider.

Every stored value counts multisets of positive integers summing to at most
`n <= 100`, so it is bounded by the partition number
`p(100) = 190569292`, comfortably inside 32 bits and far below `2^53` —
JavaScript numbers stay exact without any BigInt machinery.

**Complexity:** `O(n²)` time, `O(n)` space.
