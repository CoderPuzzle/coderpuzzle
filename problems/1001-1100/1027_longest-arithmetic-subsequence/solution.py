from typing import List, Optional


class Solution:
    def longestArithSeqLength(self, nums: List[int]) -> int:
        # dp[i][d] = length of the longest arithmetic subsequence ending at i
        # with common difference d.
        n = len(nums)
        dp = [dict() for _ in range(n)]
        best = 1
        for i in range(n):
            for j in range(i):
                d = nums[i] - nums[j]
                length = dp[j].get(d, 1) + 1
                if length > dp[i].get(d, 1):
                    dp[i][d] = length
                    if length > best:
                        best = length
        return best
