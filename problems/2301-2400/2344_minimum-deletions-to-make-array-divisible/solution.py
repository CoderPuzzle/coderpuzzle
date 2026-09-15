import math
from typing import List


class Solution:
    def minOperations(self, nums: List[int], numsDivide: List[int]) -> int:
        # An element x can head nums only if it divides every value in
        # numsDivide, and one common divisor of them all divides their GCD —
        # so reduce the target to gcd(numsDivide) once, then count how many
        # elements smaller than the smallest divisor must be deleted.
        g = 0
        for value in numsDivide:
            g = math.gcd(g, value)
        deletions = 0
        for value in sorted(nums):
            if g % value == 0:
                return deletions
            deletions += 1
        return -1
