from typing import List, Optional


class Solution:
    def longestBalanced(self, nums: List[int]) -> int:
        n = len(nums)
        best = 0
        # Fix the left endpoint and stretch the right one; the two sets hold
        # the distinct even and odd values of the current window, so equal
        # sizes mean the window is balanced.
        for left in range(n):
            evens, odds = set(), set()
            for right in range(left, n):
                if nums[right] % 2 == 0:
                    evens.add(nums[right])
                else:
                    odds.add(nums[right])
                if len(evens) == len(odds):
                    best = max(best, right - left + 1)
        # No window ever balanced leaves best at 0.
        return best
