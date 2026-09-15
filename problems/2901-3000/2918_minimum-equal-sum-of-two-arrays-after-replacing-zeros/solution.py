from typing import List


class Solution:
    def minSum(self, nums1: List[int], nums2: List[int]) -> int:
        # Sums reach 10^5 * 10^6 = 10^11, past 32 bits — Python ints are
        # arbitrary precision, so only the logic matters here.
        sum1, zeros1 = sum(nums1), nums1.count(0)
        sum2, zeros2 = sum(nums2), nums2.count(0)
        # Cheapest fill: every zero becomes 1. An array with no zeros is
        # stuck at its exact sum and can never move.
        if zeros1 == 0 and zeros2 == 0:
            return sum1 if sum1 == sum2 else -1
        if zeros1 == 0:
            # nums2 can take any sum >= sum2 + zeros2, so it must be able to
            # climb exactly to the stuck sum1.
            return sum1 if sum1 >= sum2 + zeros2 else -1
        if zeros2 == 0:
            return sum2 if sum2 >= sum1 + zeros1 else -1
        # Both arrays can climb freely from their all-1 fill: meet at the
        # higher floor.
        return max(sum1 + zeros1, sum2 + zeros2)
