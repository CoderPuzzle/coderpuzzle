# Solutions — Maximum Profit From Trading Stocks

## Reverse-order 0/1 knapsack

Each stock is an optional knapsack item: its weight is `present[i]` and its
profit is `future[i] - present[i]`. A stock that would sell for no more
than it costs is never worth buying — dropping it from any selection only
frees money — so items with a non-positive profit are skipped outright.

The table `dp[money]` holds the best profit achievable spending at most
`money`. For each stock the loop runs `money` downward so `dp[money -
present[i]]` still refers to the state before this stock was considered,
which is what caps each purchase at one copy; an ascending loop would let a
single stock be resold repeatedly. The answer is `dp[budget]`.

**Complexity:** `O(n * budget)` time, `O(budget)` space.
