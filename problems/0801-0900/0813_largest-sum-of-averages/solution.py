from typing import List, Optional


class Solution:
    def largestSumOfAverages(self, nums: List[int], k: int) -> float:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, x in enumerate(nums):
            prefix[i + 1] = prefix[i] + x

        # dp[i] = best(i, groups) for the current group count.
        # groups == 1: the whole remaining suffix is one group.
        dp = [(prefix[n] - prefix[i]) / (n - i) for i in range(n)]

        for groups in range(2, k + 1):
            ndp = [0.0] * n
            for i in range(n - groups + 1):
                result = 0.0
                for j in range(i + 1, n - groups + 2):
                    result = max(result, (prefix[j] - prefix[i]) / (j - i) + dp[j])
                ndp[i] = result
            dp = ndp

        return dp[0]
