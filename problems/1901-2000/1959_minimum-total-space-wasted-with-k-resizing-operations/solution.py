from typing import List, Optional


class Solution:
    def minSpaceWastedKResizing(self, nums: List[int], k: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]
        # g[i][j] = waste if a single allocation covers nums[i..j]
        g = [[0] * n for _ in range(n)]
        for i in range(n):
            mx = 0
            for j in range(i, n):
                if nums[j] > mx:
                    mx = nums[j]
                g[i][j] = mx * (j - i + 1) - (prefix[j + 1] - prefix[i])
        INF = float("inf")
        # dp[j][i] = min waste for suffix starting at i using j segments
        dp = [[INF] * (n + 1) for _ in range(k + 2)]
        dp[0][n] = 0
        for j in range(1, k + 2):
            for i in range(n - 1, -1, -1):
                best = INF
                for t in range(i, n):
                    if dp[j - 1][t + 1] < INF:
                        cand = g[i][t] + dp[j - 1][t + 1]
                        if cand < best:
                            best = cand
                dp[j][i] = best
        return dp[k + 1][0]
