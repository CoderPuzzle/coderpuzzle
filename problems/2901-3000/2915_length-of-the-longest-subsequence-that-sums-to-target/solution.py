from typing import List


class Solution:
    def lengthOfLongestSubsequence(self, nums: List[int], target: int) -> int:
        # dp[s] holds the longest subsequence length that sums exactly to s,
        # or -1 when s is unreachable. Sums never exceed target <= 1000, so
        # one flat array carries the whole state.
        dp = [-1] * (target + 1)
        dp[0] = 0
        for num in nums:
            # Walk s downward so each element contributes at most once
            # (0-1 knapsack, not unbounded).
            for s in range(target, num - 1, -1):
                if dp[s - num] != -1 and dp[s - num] + 1 > dp[s]:
                    dp[s] = dp[s - num] + 1
        return dp[target]
