# Solutions — Predict the Winner

## Interval DP on the Score Difference

Tracking both players' scores separately is unnecessary — only the gap matters. Define `diff(i, j)` as the best value of (current player's final score minus opponent's final score) achievable on the subarray `nums[i..j]`. The player to move takes either end, banks that number, and then sits on the other side of whatever difference the opponent secures on the rest, giving the recurrence `diff(i, j) = max(nums[i] - diff(i + 1, j), nums[j] - diff(i, j - 1))`. Player 1, who moves first on the whole array, wins exactly when `diff(0, n - 1) >= 0`, because the problem counts a tie as a win for player 1.

The solution compresses the table to a single array: initialized to `nums`, `dp[i]` holds the answer for the length-1 window ending at the current `j`. Windows are processed by increasing length; just before the assignment for window `(i, j)`, the array still holds `dp[i]` = window `(i, j - 1)` and `dp[i + 1]` = window `(i + 1, j)` — exactly the two shorter intervals the recurrence needs. Because `i` runs left to right, `dp[i + 1]` is always read before this length overwrites it, so the update `dp[i] = max(nums[i] - dp[i + 1], nums[j] - dp[i])` is a correct in-place sweep with no second array.

Both players play optimally by construction: the max chooses the better end for the mover, and the subtraction of the inner diff charges the opponent's optimal reply against the move. The base cases need no special handling beyond the initialization (a single element is taken for a diff equal to that element), and even the smallest inputs — a one-element array where player 1 takes it and wins — fall out of `dp[0] >= 0`.

**Complexity:** `O(n^2)` time, `O(n)` space.
