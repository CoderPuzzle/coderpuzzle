# Solutions — Toss Strange Coins

## Knapsack-Style Probability DP

The key insight is that tossing the `n` coins one at a time builds a distribution over the number of heads seen so far, and each new coin only shifts probability between adjacent counts. `dp[c]` holds the probability that the coins processed so far show exactly `c` heads; a coin with head probability `p` sends each old state `c` to `c + 1` with weight `p` and keeps it at `c` with weight `1 - p`.

Processing a coin updates `dp[c] = dp[c] · (1 - p) + dp[c-1] · p`, combining the tails branch of the old `c` state with the heads branch of the old `c - 1` state. The inner loop runs from `target` down to 1 so that `dp[c - 1]` still holds the previous coin's value when it is read; updating upward would let a coin contribute two heads. The `c = 0` entry is then scaled by `1 - p`, since zero heads can only be reached by another tail. Counts above `target` are never stored, pruning states that can no longer matter.

The base state is `dp[0] = 1`: before any toss, zero heads is certain. After all coins are processed, `dp[target]` is exactly the probability of `target` heads — every sequence of outcomes with the right total has been multiplied out along its unique path. Boundary cases fall out naturally: `target = 0` keeps only the all-tails product, and `target = n` accumulates the product of all head probabilities.

**Complexity:** `O(n · target)` time, `O(target)` space.
