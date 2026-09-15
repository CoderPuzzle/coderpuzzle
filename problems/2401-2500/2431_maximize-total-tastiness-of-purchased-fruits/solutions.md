# Solutions — Maximize Total Tastiness of Purchased Fruits

## Knapsack DP over budget and coupons

Each fruit has three options — skip it, buy it, or buy it with a coupon at
`price[i] // 2` — and a fruit can be used at most once. That is a 0/1
knapsack with one extra dimension: the state is the amount spent so far and
the number of coupons used so far. The table `dp[a][c]` stores the best
tastiness reachable having spent `a` and used `c` coupons, starting from
`dp[0][0] = 0` and `-1` (unreachable) elsewhere. Processing the fruits one
by one, each reachable state pushes its value to the two buy states, keeping
the larger of any two arrivals.

Iterating the budget and coupon axes in descending order is what enforces
the "at most once" rule: a fruit's updates land at `a + price[i]` (or
`a + price[i] // 2`) and `c + 1`, which are later in the descending sweep,
so the same fruit can never be consumed twice from one state. Unreachable
states are skipped via the `-1` sentinel, which also handles `tastiness[i]
= 0` fruits gracefully. At the end the answer is the largest entry in the
table — the maximum tastiness over every affordable (amount, coupons) pair.

The budget is at most 1000 and coupons at most 5, so the table has around
6000 cells and each fruit visits every cell once: the whole method is tiny
for the given limits.

**Complexity:** `O(n · maxAmount · maxCoupons)` time, `O(maxAmount ·
maxCoupons)` space.
