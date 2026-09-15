from typing import List


class Solution:
    def smallestBalancedIndex(self, nums: List[int]) -> int:
        # Suffix products saturate at total + 1: any product above the
        # total sum can never equal a prefix sum, so the sentinel value
        # compares correctly while staying small.
        n = len(nums)
        total = sum(nums)
        cap = total + 1
        suffix = [1] * (n + 1)
        prod = 1
        for i in range(n - 1, -1, -1):
            if prod > cap // nums[i]:
                prod = cap
            else:
                prod *= nums[i]
            suffix[i] = prod
        left = 0
        for i in range(n):
            if left == suffix[i + 1]:
                return i
            left += nums[i]
        return -1
