from math import gcd
from typing import List, Optional


class Solution:
    def gcdSum(self, nums: List[int]) -> int:
        # prefixGcd[i] is gcd(nums[i], running max so far). Once built, the
        # sorted list is paired smallest-with-largest, and each pair's gcd
        # is summed — a two-pointer walk from both ends. Python integers
        # hold the 5e13 worst-case sum without overflow.
        prefix_gcd = []
        running = 0
        for value in nums:
            running = value if value > running else running
            prefix_gcd.append(gcd(value, running))
        prefix_gcd.sort()
        lo, hi = 0, len(prefix_gcd) - 1
        total = 0
        while lo < hi:
            total += gcd(prefix_gcd[lo], prefix_gcd[hi])
            lo += 1
            hi -= 1
        return total
