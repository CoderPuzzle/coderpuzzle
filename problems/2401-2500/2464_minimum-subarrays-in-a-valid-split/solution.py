from math import gcd
from typing import List


class Solution:
    def validSubarraySplit(self, nums: List[int]) -> int:
        # dp[i] = fewest subarrays to validly split nums[:i]; dp[0] = 0.
        # The last subarray ends at i - 1, so its start j must satisfy
        # gcd(nums[j], nums[i - 1]) > 1, giving the transition dp[j] + 1.
        n = len(nums)
        inf = n + 1
        dp = [inf] * (n + 1)
        dp[0] = 0
        for i in range(1, n + 1):
            for j in range(i):
                if gcd(nums[j], nums[i - 1]) > 1 and dp[j] + 1 < dp[i]:
                    dp[i] = dp[j] + 1
        return dp[n] if dp[n] < inf else -1
