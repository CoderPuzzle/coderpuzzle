from typing import List, Optional


class Solution:
    def maxSumAfterPartitioning(self, arr: List[int], k: int) -> int:
        # dp[i] = best sum for the first i elements.
        n = len(arr)
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            best = 0
            running_max = 0
            for j in range(1, min(k, i) + 1):
                if arr[i - j] > running_max:
                    running_max = arr[i - j]
                candidate = dp[i - j] + running_max * j
                if candidate > best:
                    best = candidate
            dp[i] = best
        return dp[n]
