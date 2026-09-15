from typing import List
from math import gcd


class Solution:
    def subarrayGCD(self, nums: List[int], k: int) -> int:
        # Anchor the left endpoint and sweep right, carrying the running
        # gcd of nums[i..j]: it only ever shrinks (each new element can
        # lower it, never raise it). Once k stops dividing the carried
        # gcd, every later gcd divides it too, so k is unreachable —
        # break. Each j where the gcd equals k is one counted subarray.
        n = len(nums)
        total = 0
        for i in range(n):
            g = 0
            for j in range(i, n):
                g = gcd(g, nums[j])
                if g % k != 0:
                    break
                if g == k:
                    total += 1
        return total
