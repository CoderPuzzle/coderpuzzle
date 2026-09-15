# Solutions — Build Array Where You Can Find The Maximum Exactly K Comparisons

## DP over (length, cost, running maximum) with prefix sums

The search cost is the number of times a new running maximum appears: the first element always costs 1, and each later element that strictly exceeds everything before it costs one more. This suggests a DP indexed by the running state: `dp[c][j]` = number of arrays of the current length whose search cost is `c` and whose running maximum equals `j`. Extending an array by one value `v` either keeps the maximum (`v <= j`, cost unchanged) or raises it (`v = j`'s successor... precisely `v` becomes the new maximum with cost `c + 1` when `v > j`).

The recurrence distinguishes the two cases per target state `dp[c][j]`: appending any of the `j` values `1..j` to an array already having maximum `j` and cost `c` (multiplier `dp[c][j] * j`), or appending exactly the value `j` to an array of cost `c - 1` whose maximum is anything below `j` — a range sum `sum(dp[c-1][1..j-1])`. Because that second term is always a prefix of the previous-cost row, it is served by a running prefix-sum array `pref`, computed once per cost level per length step, so no `O(m)` inner loop blows up the complexity.

The base case is length 1: every value `1..m` alone gives cost 1 and maximum itself, `dp[1][j] = 1`. Each of the remaining `n - 1` appends rebuilds the table, and the final answer sums `dp[k][*]` over all maxima. Impossible requests are rejected up front: `k <= 0` is unreachable (the first element always costs at least 1), `k > n` needs more maxima than positions, and `k > m` needs more distinct increasing values than exist.

Edge cases: `n = 1` answers 1 when `k = 1` (and 0 otherwise) straight from the base row, and modulo `10^9 + 7` is applied at every accumulation so counts never overflow the language's bound anyway in Python but keep the intended contract.

**Complexity:** `O(n * k * m)` time, `O(k * m)` space.
