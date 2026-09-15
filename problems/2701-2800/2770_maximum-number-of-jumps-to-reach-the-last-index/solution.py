from typing import List


class Solution:
    def maximumJumps(self, nums: List[int], target: int) -> int:
        # dp[j] = max jumps to reach j (-1 = unreachable). Every edge i -> j
        # has i < j, so the jump graph is a DAG in index order and one
        # ascending sweep relaxes every edge exactly once.
        n = len(nums)
        dp = [-1] * n
        dp[0] = 0
        for j in range(1, n):
            best = -1
            for i in range(j):
                if dp[i] == -1:
                    continue
                diff = nums[j] - nums[i]
                if -target <= diff <= target and dp[i] + 1 > best:
                    best = dp[i] + 1
            dp[j] = best
        return dp[n - 1]
