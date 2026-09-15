# Solutions — Minimize the Difference Between Target and Chosen Elements

## Reachable-sum DP

Choosing one element from each row fixes a sum, and the objective only
looks at how far that sum sits from `target`. The set of achievable sums
after some prefix of rows is therefore all the state that matters: from a
reachable sum `s`, picking `value` in the next row reaches `s + value`. A
dynamic program keeps every sum reachable after each row — a boolean table
over `[0, maxSum]` that starts as just `{0}` and is folded row by row.

The fold is where a bitset view pays off: shifting the current set left by
`value` places every reachable sum `s` at position `s + value`, and OR-ing
those shifted copies together is exactly the row transition. Because every
`mat[i][j]` is positive, sums only grow, and the largest possible total is
the sum of the row maxima — at most 70 × 70 = 4900 — so the table never
needs more than 4901 slots.

The answer is the closest set slot to `target`: the largest reachable sum
at or below it, and the smallest reachable sum above it. Both are found by
scanning the table once, and the smaller gap is returned. Each row visits
every reachable sum and every value in the row, so the work is bounded by
`m` rows times the sum range times the row width.

**Complexity:** `O(m · n · maxSum)` time, `O(maxSum)` space, with
`maxSum ≤ 4900`.
