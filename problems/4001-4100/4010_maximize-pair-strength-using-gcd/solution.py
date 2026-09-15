from math import gcd
from typing import List


class Solution:
    def maxPairStrength(self, nums: List[int]) -> int:
        # Fewer than two million pairs at n <= 2000, so every distinct index
        # pair is tried directly: g = gcd(a, b), strength = a * b // g**2.
        # The division is exact because g divides both factors, and equal
        # values collapse to 1, which is why [3, 3] scores 1. Python
        # integers never overflow at this magnitude.
        best = 0
        n = len(nums)
        for i in range(n):
            a = nums[i]
            for j in range(i + 1, n):
                b = nums[j]
                g = gcd(a, b)
                s = a * b // (g * g)
                if s > best:
                    best = s
        return best
