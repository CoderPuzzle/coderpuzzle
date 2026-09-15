from typing import List, Optional


class Solution:
    def predictTheWinner(self, nums: List[int]) -> bool:
        n = len(nums)
        # dp[i] = best (player-to-move score - opponent score) on the current
        # window ending at j, processed by increasing window length.
        dp = list(nums)
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                # Take an end, bank it, and absorb the opponent's optimal
                # reply as a subtracted sub-difference. In place, dp[i] is
                # still window (i, j-1) and dp[i+1] is (i+1, j) — the two
                # shorter intervals the recurrence needs.
                dp[i] = max(nums[i] - dp[i + 1], nums[j] - dp[i])
        # Player 1 moves first on the whole array; ties count as a win.
        return dp[0] >= 0
