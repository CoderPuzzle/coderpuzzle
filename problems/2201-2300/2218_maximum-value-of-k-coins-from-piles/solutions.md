# Solutions — Maximum Value of K Coins From Piles

## Bounded knapsack over piles with prefix sums

Choosing `k` coins optimally means deciding, for each pile, how many coins to take from its top — and taking `t` coins from a pile always means taking exactly its first `t` coins, worth the `t`-th prefix sum of that pile, since you would never skip a coin above one you take. This turns the problem into a bounded knapsack: `dp[j]` is the best total value using exactly `j` coins from the piles processed so far, and each new pile transitions `ndp[j] = max over t of dp[j - t] + prefix[t]`, with `t` running from 0 (skip the pile) up to `min(pile length, j)` — the cap `take_max = min(len(pile), k)` ensures `t` never exceeds either what the pile contains or what could ever be useful.

The inner maximum is evaluated directly rather than with a sliding-window trick, which is fine under the constraints: the double loop costs `k * min(len_i, k)` per pile, and since taking more coins is never forced (all coin values are positive, `dp[j]` for `j < k` still carries meaningful optima forward), the final answer is read at `dp[k]`. A fresh `ndp` row is allocated per pile so transitions always read the previous pile's state, giving the classic 0/1-style correctness for a "grouped" item.

Let `s` be the total number of coins, so `Σ min(len_i, k) <= s <= 2000` and the whole search does at most `k * s` inner iterations. Only the current and previous `dp` rows plus one pile's prefix array are alive at a time, so the working memory is a single `O(k)` row plus transient `O(len_i)`.

**Complexity:** `O(k · s)` time, `O(k)` space.
