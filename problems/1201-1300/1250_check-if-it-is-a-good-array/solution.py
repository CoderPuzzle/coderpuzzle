from math import gcd
from typing import List


class Solution:
    def isGoodArray(self, nums: List[int]) -> bool:
        # Bézout: the reachable sums are exactly the multiples of the gcd,
        # so a sum of 1 exists iff the overall gcd is 1.
        overall = 0
        for value in nums:
            overall = gcd(overall, value)
            if overall == 1:
                return True
        return overall == 1
