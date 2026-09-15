# Solutions — Maximum Number of Books You Can Take

## Monotonic Stack DP on Strictly Increasing Runs

Fix the right end `i` of the chosen section. The taken amounts must strictly increase left to right, so the rightmost shelf should give everything: `books[i]` books, then `books[i] - 1` on the shelf to its left, `books[i] - 2`, and so on, each shelf's take being fully determined by its distance from `i`. Taking the maximum on the right never hurts, because the strictly-increasing constraint only upper-bounds shelves to the left. Let `dp[i]` be the best total of such a chain ending at shelf `i`.

Walking left, the descending chain survives while each shelf `x` can hold the required `books[i] - (i - x)` books. It stops at the nearest `j` where `books[j] < books[i] - (i - j)`; there the chain over shelves `j+1..i` of length `L` contributes the arithmetic sum `L * books[i] - L(L-1)/2`, and the optimal continuation is exactly `dp[j]`, since shelf `j` tops out at `books[j]`, strictly below the value the chain would have demanded there — so the two chains splice into one valid strictly increasing sequence. If no such barrier exists, the chain runs back to shelf 0 but cannot demand fewer than one book per shelf, so its length is `min(i, books[i]) + 1`.

![The example shelves 8, 2, 3, 7, 3, 4, 0, 1, 4, 3 as bars with the taken portions 1, 2, 3, 7 highlighted: shelf 2 with only 3 books is the barrier that stops the chain from shelf 3 (which would demand 6), so dp[3] = 7 + dp[2] splices the two runs into 13.](figures/solution-spliced-runs.svg)

Finding `j` quickly is a monotonic stack of barrier candidates: when `i` arrives, pop every stacked `x` with `books[x] >= books[i] - (i - x)` (those shelves fit the chain and are superseded — any future chain that would stop past `x` also stops at or before `i`, which is closer). The remaining top is `j`, then `i` is pushed. Each index is pushed and popped at most once, so the sweep is linear; the answer is the maximum `dp[i]`, `0` for an empty array. Sharp drops like `books[i] = 0` simply make shelf `i` its own chain of length 1 contributing 0, which the max over all `dp` handles correctly.

**Complexity:** `O(n)` time, `O(n)` space.
