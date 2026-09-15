from typing import List
from math import gcd


class Solution:
    def subarrayLCM(self, nums: List[int], k: int) -> int:
        # Anchor the left endpoint and sweep right, carrying the running
        # lcm of nums[i..j]: it only ever grows (each new element can
        # raise it, never lower it). Once it exceeds k, every later lcm
        # in this sweep is larger still, so k is unreachable — break.
        # Each j where the lcm equals k is one counted subarray.
        n = len(nums)
        total = 0
        for i in range(n):
            l = 1
            for j in range(i, n):
                l = l // gcd(l, nums[j]) * nums[j]
                if l > k:
                    break
                if l == k:
                    total += 1
        return total
