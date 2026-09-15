# Solutions — House Robber

Two formulations of the same recurrence: work forward with two rolling
variables, or ask the question top-down and let memoized recursion fill
the answers in on demand. Both compute `best(i) = max(best(i-1), best(i-2) + nums[i])`; only the direction of travel differs.

## dp

At every house the robber faces exactly two choices — rob it or skip it — and the constraint only couples adjacent houses. So the best loot achievable through house `i` depends solely on the best through house `i-1` (skip, keep that value) and the best through house `i-2` plus this house's money (rob). This is the recurrence `best(i) = max(best(i-1), best(i-2) + nums[i])`.

The implementation compresses the DP table to two rolling variables: `cur` holds `best(i-1)` and `prev` holds `best(i-2)` when the loop arrives at house `i`. The simultaneous tuple assignment `prev, cur = cur, max(cur, prev + x)` advances both values in one step without a temporary array, which is what makes the space constant.

Because the recurrence only looks two steps back, a single left-to-right pass computes the global optimum — no recursion or memoization table is needed. Both variables start at 0, which correctly represents "no houses robbed yet," so a one-house array returns its own value and any prefix of the street is handled uniformly.

**Complexity:** `O(n)` time, `O(1)` space.

## memo_dfs

The top-down mirror of the same recurrence: define `best(i)` as the maximum loot obtainable from house `i` onward. Standing at house `i`, the robber either robs it — collecting `nums[i]` and jumping to `best(i + 2)` since the neighbor becomes off limits — or skips it and consults `best(i + 1)`. Past the last house there is nothing left to take, which is the base case.

Naively this branches twice per house, but the two branches overlap almost completely: every call eventually asks about a small set of suffixes. The `memo` array caches each `best(i)` the first time it is settled (marked `-1` until then), so every suffix is solved exactly once and the recursion degenerates to `n` constant-time computations plus `n` cache hits — the same linear work as the iterative pass, just discovered in demand order rather than left-to-right order.

The recursion depth is bounded by the `best(i) -> best(i+1)` chain, at most `n` frames; with `n <= 100` this is trivially safe in every language, well inside the default stack and recursion limits.

**Complexity:** `O(n)` time, `O(n)` space for the memo table (plus the recursion stack).
