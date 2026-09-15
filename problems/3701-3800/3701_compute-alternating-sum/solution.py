from typing import List


class Solution:
    def alternatingSum(self, nums: List[int]) -> int:
        # Even indices add, odd indices subtract: walk the array two
        # positions at a time, adding each even-index element and
        # subtracting the odd-index partner that follows it. A trailing
        # element at the last even index has no partner to subtract.
        total = 0
        n = len(nums)
        for i in range(0, n, 2):
            total += nums[i]
            if i + 1 < n:
                total -= nums[i + 1]
        return total
