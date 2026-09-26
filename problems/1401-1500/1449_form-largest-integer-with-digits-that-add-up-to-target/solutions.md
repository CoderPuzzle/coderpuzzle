# Solutions — Form Largest Integer With Digits That Add up to Target

## Maximize the digit count, then greedily spend it

More digits always beat bigger digits — a 4-digit number exceeds any
3-digit one — so the primary objective is the most digits whose costs sum
to exactly `target`, and only among equal lengths does the lexicographic
order matter. The first phase is an unbounded knapsack over counts:
`dp[t]` = the most digits of exact total cost `t`, with `dp[0] = 0` and
`dp[t] = max(dp[t - cost[d]] + 1)` over the nine digits.

The second phase spends the table greedily. Standing at some remaining
budget `t` with `dp[t]` digits to place, it tries digits from 9 down to 1
and picks the first `d` with `dp[t - cost[d]] == dp[t] - 1`: that digit
leaves a budget from which the remaining digit count is still achievable,
and taking the largest such digit first is optimal because the remaining
positions are forced to be fewer. When `dp[target]` is unreachable the
answer is `"0"`.

![For cost = [4, 3, 2, 5, 6, 7, 2, 5, 5] and target 9, the dp row of most digits per exact budget reads 0, -, 1, 1, 2, 2, 3, 3, 4, 4 and the greedy descent 9, 7, 5, 3, 0 picks digits 7, 7, 7, 2 to spell 7772.](figures/solution-dp-row-greedy-descent.svg)

Costs and target are at most 5000, so the table is 5001 integers and the
two phases are `9 · target` operations each. The answer string can hold
up to 5000 digits — well within the output budget.

**Complexity:** `O(9 · target)` time, `O(target)` space.
