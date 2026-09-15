from math import gcd
from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        n = len(nums)
        ones = nums.count(1)
        if ones > 0:
            # A 1 in hand absorbs every other element with exactly one
            # operation each: replace the neighbor with gcd(x, 1) = 1.
            return n - ones
        best = n + 1
        for i in range(n):
            g = 0
            for j in range(i, n):
                g = gcd(g, nums[j])
                if g == 1:
                    # Shortest window wins: L - 1 ops fold these L elements
                    # into one 1, then every other element costs one op.
                    best = min(best, j - i + 1)
                    break
        return -1 if best > n else best - 1 + (n - 1)
