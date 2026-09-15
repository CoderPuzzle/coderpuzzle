# Solutions — Maximize Score of Numbers in Ranges

## Binary Search on the Answer with a Greedy Feasibility Check

The key observation is monotonicity: if a minimum pairwise gap of `x` is achievable, then every smaller gap is achievable too (the very same choice of integers works). This invites binary search on the score itself, over the range from `0` up to the full coordinate span `max(start) + d - min(start)` (plus one, so the upper bound stays infeasible). The search finds the largest `x` for which a feasible selection exists and returns it as `lo - 1`.

The feasibility check is greedy and runs on the intervals sorted by left endpoint. Place the first number at `start[0]`, the smallest value in its interval. For each subsequent interval, choose the smallest allowed value that is at least `last + x`, namely `max(start[i], last + x)`; if that exceeds `start[i] + d`, gap `x` cannot be honored. Taking the smallest legal value at every step is optimal by an exchange argument: any feasible configuration can be transformed into this leftmost one without decreasing any chosen value's successor requirement, so if the greedy fails, every assignment fails.

Sorting makes the pairwise-minimum condition local: with the chosen values non-decreasing, the minimum absolute difference is realized between some two consecutive values, so keeping every consecutive gap at least `x` (which the greedy enforces directly) is exactly the condition that the score is at least `x`.

Edge cases: `d` may be `0` (degenerate intervals), and `start` values may coincide; both are handled because the check compares against the sorted left endpoints and never assumes strict separation. The answer can be `0` when two intervals force a collision. With `W` denoting the coordinate span `max(start) + d - min(start) + 1`, the binary search performs `O(log W)` greedy checks.

**Complexity:** `O(n log n + n log W)` time, `O(n)` space.
