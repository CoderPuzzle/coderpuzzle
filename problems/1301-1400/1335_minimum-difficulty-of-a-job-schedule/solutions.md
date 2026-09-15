# Solutions — Minimum Difficulty of a Job Schedule

## Partition DP with a Running Day Maximum

The schedule is fully described by where the d−1 cut points fall, so the problem is to cut the array into d contiguous non-empty blocks minimizing the sum of block maxima. Since jobs must be done in order, a DP over prefixes suffices: `dp[j][i]` is the minimum total difficulty of scheduling the first `i` jobs in `j` days, with `dp[0][0] = 0` as the anchor and everything else initialized to infinity.

The transition fixes the last day to be jobs `k .. i` for some k: its contribution is the maximum difficulty in that block, added to the already-optimal `dp[j−1][k−1]`. Naively each block maximum costs its own scan, but iterating k downward from i lets the code carry a single running `day_max` — extending the last day by one job to the left just folds one more value into the maximum — so every candidate split point is evaluated in O(1). Unreachable states (fewer jobs than days) keep infinity and never contaminate the answer.

Feasibility edges: if `n < d` there are not enough jobs to give each day at least one, so −1 is returned up front; the inner loop starting `i` at `j` likewise enforces one job per day, and `d = 1` reduces to the maximum of the whole array. Negative difficulties never occur, but the running maximum makes the order of the k loop the only thing that matters, not the sign of values.

**Complexity:** `O(d · n²)` time, `O(d · n)` space.
