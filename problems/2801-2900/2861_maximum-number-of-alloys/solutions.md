# Solutions — Maximum Number of Alloys

## Binary search the alloy count per machine

Fix one machine m. Making x alloys on it spends
`sum(max(0, x * composition[m][j] - stock[j]) * cost[j])` coins: metal j
is covered by stock up to `stock[j]` units, and everything beyond that is
bought at `cost[j]` per unit. That total never decreases as x grows, so
"can we afford x alloys?" is a monotone predicate and the largest feasible
x can be found by binary search. The search range has a tight, provable
cap: the metal j whose `stock[j]` is smallest needs at least
`x - stock[j]` units bought for any machine, since every
`composition[i][j] >= 1` and every unit of it costs at least one coin, so
`x <= min(stock) + budget <= 2 * 10^8` — comfortably inside signed 32-bit
for the returned answer.

The final answer is the maximum of the per-machine counts, evaluated by
probing every machine at each candidate count. Per machine a probe costs
O(n) arithmetic, the probe count is `O(log(min(stock) + budget)) <= 28`,
and there are k machines, giving `O(k * n * log(min(stock) + budget))`
time and O(1) extra space. One subtlety: the running spend itself is not
32-bit safe — a single term can reach `2 * 10^8 * 100 * 100 = 2 * 10^12`,
and the n-term sum up to `2 * 10^14` — so implementations accumulate in
64-bit integers (or doubles/JS numbers, which stay exact below `2^53`).

**Complexity:** `O(k * n * log(min(stock) + budget))` time, `O(1)` space.
