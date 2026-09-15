from typing import List, Optional


class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        # Divisibility is transitive, so in ascending order each element
        # need only be divisible by the previous one — a longest-chain DP.
        nums = sorted(nums)
        n = len(nums)
        if n == 0:
            return []
        # dp[i] = size of the largest divisible subset ending at nums[i];
        # parent links let the subset be rebuilt, not just counted.
        dp = [1] * n
        parent = [-1] * n
        best = 0
        for i in range(n):
            # Every earlier divisor offers the extension dp[j] + 1.
            for j in range(i):
                if nums[i] % nums[j] == 0 and dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    parent[i] = j
            if dp[i] > dp[best]:
                best = i
        # Trace parent links from the largest chain, reverse to ascending.
        result = []
        i = best
        while i != -1:
            result.append(nums[i])
            i = parent[i]
        result.reverse()
        return result
