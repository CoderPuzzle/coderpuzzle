# Solutions — Minimum Number of Increasing Subsequence to Be Removed

## Longest non-increasing subsequence

Every removal takes out a strictly increasing subsequence, and two elements x >= y appearing in that order can never belong to the same strictly increasing removal. A longest non-increasing subsequence therefore forces at least as many operations as its length — its elements must be spread across distinct removals. Dilworth's theorem (or the patience-sorting construction itself) shows this bound is tight: the array partitions into exactly that many strictly increasing subsequences, so the answer equals the longest non-increasing subsequence length.

That length is computed with the standard patience trick, negated: storing -x and using bisect_right makes equal values extend one stack instead of starting a new one, which turns "longest strictly increasing" into "longest non-increasing" for the original values. Each element either opens a new pile (appended to tails) or replaces the leftmost pile top it can sit on, and the pile count is the wanted length.

![On `nums = [5,3,1,4,2]` the deal opens piles for `5`, `3`, `1`, then `4` lands on `3` and `2` lands on `1`, leaving piles `[5]`, `[3,4]`, `[1,2]` — 3 piles, each one strictly increasing removal, and the pile count `3` is the answer.](figures/solution-patience-piles.svg)

The whole computation is one linear pass with a binary search per element, replacing the O(n²) removal reasoning with a bound that is both a certificate (the chain) and a construction (the piles). Sorted ascending or descending inputs exercise the extremes — one pile versus n piles.

**Complexity:** `O(n log n)` time, `O(n)` space.
