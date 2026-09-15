# Solutions — Target Sum

## Counting DP over Reachable Sums

Instead of enumerating all `2^n` sign assignments, the solution propagates only the sums that are actually reachable and how many assignments produce each. The map starts at `{0: 1}` — one way to have a running total of zero before any number — and each number `value` branches every entry: a total `t` with count `c` contributes `c` to `t + value` and `c` to `t - value` in the next map. After all numbers are folded in, the answer is simply `dp.get(target, 0)`.

The map is a sparse version of the classic subset-sum table, and its size is self-limiting: after processing `i` numbers the keys are distinct values of the signed sum, which lie in a window of width at most `2 * S`, where `n` is the count of numbers and `S` their total (at most 1000 here). So even though each step conceptually doubles the entries, identical totals merge and their counts add — the work per number is bounded by the number of distinct sums, not by `2^i`.

Example 1 (`nums = [1,1,1,1,1]`, `target = 3`) grows the map as follows:

1. `dp = {0: 1}` — one way to stand at total 0 before any number.
2. After the first 1: `{1: 1, -1: 1}`.
3. After the second: `{2: 1, 0: 2, -2: 1}` — the two branches from each 0-count merge on 0.
4. After the third and fourth: `{3: 1, 1: 3, -1: 3, -3: 1}`, then `{4: 1, 2: 4, 0: 6, -2: 4, -4: 1}`.
5. After the fifth: `{5: 1, 3: 5, 1: 10, -1: 10, -3: 5, -5: 1}` — `dp[3] = 5`, the five positions for the single minus sign.

Zeros need no special-casing even though they double everything: `+0` and `-0` lead to the same total through different branches, so the count for that total is genuinely doubled, which is correct because the problem counts the two expressions as different. The same merging also means unreachable targets come back as 0 via the `get` default, and the single-element case falls straight out of one branching step.

**Complexity:** `O(n·S)` time, `O(S)` space.
