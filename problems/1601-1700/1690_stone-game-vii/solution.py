from typing import List, Optional


class Solution:
    def stoneGameVII(self, stones: List[int]) -> int:
        # Each move removes one of the two ends, so a position is fully the
        # run stones[l..r] still on the table. Both players optimize the same
        # number from their own side: dp[l][r] is the best margin, mover's
        # score minus opponent's, on that run — taking the left stone banks
        # sum(l+1..r) and hands the rest over, whose best margin there
        # becomes the taker's deficit; the right stone mirrors it. Fill l
        # descending / r ascending so both shorter runs are ready.
        n = len(stones)
        pre = [0] * (n + 1)
        for i, v in enumerate(stones):
            pre[i + 1] = pre[i] + v
        dp = [[0] * n for _ in range(n)]
        for l in range(n - 2, -1, -1):
            row = dp[l]
            below = dp[l + 1]
            pl = pre[l]
            pl1 = pre[l + 1]
            for r in range(l + 1, n):
                a = pre[r + 1] - pl1 - below[r]
                b = pre[r] - pl - row[r - 1]
                row[r] = a if a > b else b
        return dp[0][n - 1]
