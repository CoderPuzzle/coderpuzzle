from typing import List


class Solution:
    def numberOfPairs(self, nums1: List[int], nums2: List[int], k: int) -> int:
        # The constraints are tiny (50 x 50), so the direct double loop
        # wins: for every value in nums2 build the divisor nums2[j] * k and
        # count how many values of nums1 it divides.
        total = 0
        for value in nums1:
            for base in nums2:
                if value % (base * k) == 0:
                    total += 1
        return total
