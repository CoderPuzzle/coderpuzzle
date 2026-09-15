from typing import List, Optional


class Solution:
    def maxAdjacentDistance(self, nums: List[int]) -> int:
        # One pass over the n circular edges: pair i with (i + 1) mod n,
        # so the last iteration compares the last and first elements.
        ans = 0
        n = len(nums)
        for i in range(n):
            d = abs(nums[i] - nums[(i + 1) % n])
            if d > ans:
                ans = d
        return ans
