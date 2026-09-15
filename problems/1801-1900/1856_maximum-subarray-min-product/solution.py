from typing import List, Optional


class Solution:
    def maxSumMinProduct(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, v in enumerate(nums):
            prefix[i + 1] = prefix[i] + v
        best = 0
        stack = []  # indices with strictly increasing values
        for i in range(n + 1):
            cur = nums[i] if i < n else 0  # sentinel 0 pops everything
            while stack and nums[stack[-1]] >= cur:
                m = nums[stack.pop()]
                left = stack[-1] if stack else -1
                total = prefix[i] - prefix[left + 1]
                best = max(best, m * total)
            if i < n:
                stack.append(i)
        return best % MOD
