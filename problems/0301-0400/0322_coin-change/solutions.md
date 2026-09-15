# Solutions — Coin Change

The minimum coin count seen two ways: fill a table of best answers for
every amount bottom-up, or search the space of amounts level by level so
that the first arrival at the target is automatically optimal.

## dp

The minimum coin count for an amount decomposes cleanly: if the last coin used is `c`, the rest of the amount `a - c` must itself be optimally made, so `dp[a] = min(dp[a - c] + 1)` over every coin `c ≤ a`. Because each coin may be used any number of times, `dp` is simply filled for every amount from 1 up to the target, each entry trying every coin — the classic unbounded knapsack laid out iteratively.

`dp[0]` is 0 (zero coins make zero) and every other slot starts at infinity, which doubles as the "unreachable" marker. If no coin fits an amount, the entry stays infinite; the sentinel propagates naturally through later amounts that would have built on it, because `inf + 1` is still `inf` and never wins a minimum. At the end `dp[amount]` is returned, or `-1` if it is still infinite — the no-solution case like `coins = [2]`, `amount = 3`.

The loop order makes the algorithm correct by construction: amounts are processed smallest first, so when amount `a` consults `dp[a - c]`, that entry is already final. Greedy largest-coin-first would be wrong for arbitrary denominations (a coin set like `[1, 3, 4]` with amount 6 tempts `4 + 1 + 1` = three coins over the optimal `3 + 3` = two), and DP sidesteps that trap entirely.

Edge cases: `amount = 0` returns 0 immediately from the initialization; coins larger than the current amount are skipped by the `c <= a` guard. With at most 12 coins and amount at most 10⁴, the double loop performs at most ~1.2 · 10⁵ relaxations.

**Complexity:** `O(amount · |coins|)` time, `O(amount)` space.

## bfs

Reading the same problem as a shortest-path turns the coin count into a path length. Make one vertex per amount `0..amount`, with an edge `a -> a + c` for every coin that fits; every edge costs exactly one coin, so the minimum coin count for `amount` is the shortest path from `0` to `amount` — and unit edge weights mean plain BFS finds it.

The search runs level by level: the queue starts holding only `0` (zero coins), and each pass expands the whole current level, producing exactly the set of amounts makeable with one more coin. The first time `amount` comes off the queue, the level counter is the answer, because BFS reaches no vertex through fewer levels than the one it is dequeued at. A `visited` array marks each amount when it is enqueued, so every vertex enters the queue at most once and the whole search touches at most `amount + 1` vertices and `amount · |coins|` edges — the same work bound as the DP, just discovered in a different order: where the DP finishes all smaller amounts first, BFS explores strictly by coin count.

Unmakeable targets fall out as queue exhaustion: if every reachable amount has been expanded and `amount` was never among them, no path exists and the answer is `-1` (as with `coins = [2]`, `amount = 3`). `amount = 0` needs no special case — it is the start vertex, dequeued at level 0. Coins larger than `amount - a` cannot extend an amount and are skipped before any addition, which also sidesteps overflow in the fixed-width languages since a coin may be nearly `INT_MAX`.

**Complexity:** `O(amount · |coins|)` time, `O(amount)` space for the queue and visited array.
