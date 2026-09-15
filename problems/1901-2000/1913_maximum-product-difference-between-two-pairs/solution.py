from typing import List


class Solution:
    def maxProductDifference(self, nums: List[int]) -> int:
        # Every value is positive, so the difference is maximized by the
        # product of the two largest values minus the product of the two
        # smallest; one streaming pass maintains all four extremes.
        # Sentinels are safe: values lie in [1, 10**4].
        m1 = m2 = 0
        s1 = s2 = 10**9
        for x in nums:
            if x > m1:
                m1, m2 = x, m1
            elif x > m2:
                m2 = x
            if x < s1:
                s1, s2 = x, s1
            elif x < s2:
                s2 = x
        return m1 * m2 - s1 * s2
