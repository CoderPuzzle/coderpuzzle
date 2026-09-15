from typing import List


class Solution:
    def splitArray(self, nums: List[int]) -> int:
        n = len(nums)
        # e ends the longest strictly increasing prefix: a left part
        # nums[0..i] is strictly increasing exactly when i <= e.
        e = 0
        while e + 1 < n and nums[e + 1] > nums[e]:
            e += 1
        # s starts the longest strictly decreasing suffix: a right part
        # nums[i+1..n-1] is strictly decreasing exactly when i + 1 >= s.
        s = n - 1
        while s > 0 and nums[s - 1] > nums[s]:
            s -= 1
        # One scan accumulates the left sum; the right sum is the total
        # minus it. Only indices inside the anchor window are scored.
        total = sum(nums)
        best = -1
        left = 0
        for i in range(n - 1):
            left += nums[i]
            if i + 1 >= s and i <= e:
                diff = abs(left - (total - left))
                if best == -1 or diff < best:
                    best = diff
        return best
