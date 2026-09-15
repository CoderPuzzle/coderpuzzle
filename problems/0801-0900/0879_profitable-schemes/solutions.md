# Solutions — Profitable Schemes

## 0-1 Knapsack with a Capped Profit Dimension

Counting schemes is a 0-1 knapsack over crimes with two budgets: members (at most `n`) and profit (at least `minProfit`). Each crime is either taken — consuming `group[i]` members and earning `profit[i]` — or skipped. The one trick that keeps the state space small is capping the profit dimension at `minProfit`: once the threshold is met, extra profit changes nothing, so `dp[members][cap]` counts subsets using at most `members` members and earning at least `cap` profit, with `cap` clamped into `[0, minProfit]`.

The base case `dp[members][0] = 1` for every member budget seeds the empty scheme, which trivially satisfies "at least 0" profit — this is what makes `minProfit = 0` fall out naturally (every subset counts, including the empty one). Each crime `(g, p)` is processed by iterating `members` from `n` down to `g` and `cap` from `minProfit` down to `0`; the descending order is the classic knapsack guard ensuring each crime is used at most once, reading the previous crime's counts before overwriting them. The transition adds `dp[members - g][max(0, cap - p)]`, where `max(0, ...)` performs the profit clamp, and every accumulation is reduced modulo `10^9 + 7`.

After all crimes are processed, `dp[n][minProfit]` is the number of subsets that fit the member budget while meeting the profit floor. With at most `G = len(group)` crimes, `n <= 100`, and `minProfit <= 100`, the triple loop stays within a few million operations.

Example 1 (`n = 5`, `minProfit = 3`, `group = [2,2]`, `profit = [2,3]`) fills a tiny table:

1. Base: `dp[m][0] = 1` for every member budget (the empty scheme); all other caps are 0.
2. Crime (2 members, 2 profit) updates `dp[5]` to `[2, 1, 1, 0]`.
3. Crime (2, 3) then hits the clamp at cap 3, reading `dp[3][max(0, 3-3)] = dp[3][0] = 2`, so `dp[5][3] = 0 + 2 = 2`.
4. The two schemes counted are {crime 1} alone (profit 3) and both crimes (profit 5), matching the statement.

**Complexity:** `O(G·n·minProfit)` time, `O(n·minProfit)` space.
