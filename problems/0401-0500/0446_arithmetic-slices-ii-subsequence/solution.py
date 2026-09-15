from typing import List, Optional


class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        n = len(nums)
        # dp[i][d] = number of arithmetic subsequences of length >= 2 ending
        # at i with common difference d. Hashing per (index, difference)
        # absorbs the huge, possibly negative differences.
        dp = [{} for _ in range(n)]
        total = 0
        for i in range(n):
            for j in range(i):
                d = nums[i] - nums[j]
                cnt = dp[j].get(d, 0)
                # Each length >= 2 subsequence ending at j extends by nums[i]
                # into a slice of length >= 3, counted once at its last element.
                total += cnt
                # cnt extensions plus the new length-2 pair (j, i) itself;
                # pairs of exactly length 2 reach the total only via extension.
                dp[i][d] = dp[i].get(d, 0) + cnt + 1
        return total
