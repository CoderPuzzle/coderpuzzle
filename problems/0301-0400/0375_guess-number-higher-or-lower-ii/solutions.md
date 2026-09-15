# Solutions — Guess Number Higher or Lower II

## Interval DP (minimax)

For a target hidden in `[i, j]`, guessing `g` costs `g` immediately plus whatever the remaining game costs in the _worse_ of the two possible replies: `dp[i][g-1]` if the number is lower, `dp[g+1][j]` if it is higher (both are 0 when the side is empty). Since the opponent may pick the worst number, the cost of guessing `g` is `g + max(dp[i][g-1], dp[g+1][j])`, and the best first guess minimizes that expression. `dp[i][j]` is exactly this minimax value — the minimum money that guarantees finding any number in `[i, j]`.

The table is filled by interval length because a range's value depends strictly on shorter subranges of it. `length = 1` ranges are already 0 (a single candidate is guessed for free), so the loops start at length 2, with `i` ranging over all starts and `j = i + length - 1`; the answer is `dp[1][n]`. The array is padded to `(n+2) x (n+2)` so the boundary accesses `dp[i][i-1]` and `dp[j+1][j]` are valid without conditionals. A plain recursion recomputes the same intervals exponentially often; the length-ordered table computes each of the `O(n²)` cells once, each cell scanning up to `n` guesses.

Edge cases: `n = 1` returns 0 because every loop body is skipped and `dp[1][1]` stays 0; `n = 2` correctly yields 1 (guess the cheaper number, pay 1 if wrong). Guessing an interior number that leaves two non-empty sides is handled by the `max`, and the minimum over guesses naturally prefers boundary guesses when they dominate.

**Complexity:** `O(n³)` time, `O(n²)` space.
