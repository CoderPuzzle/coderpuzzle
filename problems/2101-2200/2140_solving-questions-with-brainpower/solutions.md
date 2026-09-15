# Solutions — Solving Questions With Brainpower

## Backward Dynamic Programming

Decisions proceed left to right, and the best you can do from question `i` depends only on what happens from the next question you are allowed to face. That suggests defining `dp[i]` as the maximum points obtainable starting at question `i`, with the base case `dp[n] = 0` — nothing is left. Computing the table from right to left makes every future value available before it is needed.

The transition considers the two choices at question `i`. Skipping gives `dp[i + 1]` unchanged. Solving yields `points_i` plus `dp[i + brainpower_i + 1]`, the first question unlocked after the brainpower lockout; because `dp` is sized `n + 1`, a jump past the end safely reads the zero sentinel. Then `dp[i] = max(skip, solve)`, and the answer is `dp[0]`.

![The example exam laid out with its dp row: solving question 0 jumps over questions 1 and 2 to read dp[3] = 2, giving 3 + 2 = 5, while every other question prefers its skip value, so the table fills 2, 4, 4, 5 from right to left.](figures/solution-backward-dp.svg)

Stepping the example right to left:

1. `dp[4] = 0` — the sentinel past the last question.
2. `i = 3`: solving is worth 2 with a jump past the end, skipping gives 0, so `dp[3] = 2`.
3. `i = 2` and `i = 1`: both lockouts also jump past the end, so each keeps its own 4 points — `dp[2] = dp[1] = 4`.
4. `i = 0`: skipping is worth `dp[1] = 4`; solving gives `3 + dp[0 + 2 + 1] = 3 + 2 = 5`, so `dp[0] = 5`.

A single reverse pass fills the table with constant work per question. Only one 1-D array is stored, and no auxiliary structure is needed since the "next solvable question" is a direct index computation. The same recurrence would also work with a forward formulation, but the backward sweep keeps the lockout jump a plain array lookup.

**Complexity:** `O(n)` time, `O(n)` space.
