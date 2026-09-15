from typing import List


class Solution:
    def findGCD(self, nums: List[int]) -> int:
        # The answer is gcd(min, max). Find both extremes in one pass, then
        # reduce them with Euclid's algorithm.
        mn = nums[0]
        mx = nums[0]
        for value in nums:
            mn = min(mn, value)
            mx = max(mx, value)
        while mx:
            mn, mx = mx, mn % mx
        return mn
