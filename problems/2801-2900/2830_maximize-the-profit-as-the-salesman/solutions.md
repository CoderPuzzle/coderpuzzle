# Solutions — Maximize the Profit as the Salesman

## Dynamic Programming over House Positions

Because accepted offers must not overlap, the houses form a line and the problem is a weighted interval scheduling in disguise. Let `dp[e + 1]` be the maximum gold obtainable from houses `0` through `e`; then `dp[e + 1]` is either `dp[e]` (house `e` left unsold) or, for every offer `[start, e, gold]` ending exactly at `e`, the value `dp[start] + gold` (sell that offer, and combine it with the best solution strictly before its start). Taking the maximum over these candidates gives the recurrence, and `dp[n]` is the answer.

To evaluate it in a single sweep, the offers are bucketed by their end house: `by_end[e]` holds the `(start, gold)` pairs finishing at `e`. The DP then walks `e` from `0` to `n - 1` in order, so every `dp[start]` an offer needs has already been computed when the offer's end is reached. No sorting of offers is required — the bucket array itself provides the ordering by end position.

Houses that no offer ends at simply carry the previous value forward, which is also what lets offers be skipped when leaving a house unsold is better. Overlapping offers conflict automatically: an offer starting at or after a previous offer's start but before its end can only be combined if the DP value it reads excludes the earlier one, which the recurrence enforces by only adding gold to `dp[start]`, the optimum before the offer's own interval. Some houses remaining unsold is handled by the carry-over branch.

**Complexity:** `O(n + m)` time, `O(n + m)` space, where `m` is the number of offers.
