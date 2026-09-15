from typing import List, Optional


class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        # dp[i] = length of the longest increasing subsequence ending
        # exactly at i; the global answer is the max over all endings.
        dp = [1] * n
        for i in range(n):
            # Every earlier smaller element can precede nums[i], so extend
            # the best of those chains by one.
            for j in range(i):
                if nums[j] < nums[i] and dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
        return max(dp)
