from typing import List, Optional


class Solution:
    def isZeroArray(self, nums: List[int], queries: List[List[int]]) -> bool:
        n = len(nums)
        # Difference array: +1 at l and -1 at r+1 per query; the spare slot
        # at index n absorbs the r+1 == n write without a bounds check.
        diff = [0] * (n + 1)
        for l, r in queries:
            diff[l] += 1
            diff[r + 1] -= 1
        coverage = 0
        # The prefix sum recovers how many queries cover each index. Each
        # covering query removes at most one unit there, so zeroing is
        # possible iff coverage never falls below nums[i].
        for i in range(n):
            coverage += diff[i]
            if coverage < nums[i]:
                return False
        return True
