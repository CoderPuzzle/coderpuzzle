from typing import List

MOD = 1_000_000_007


class Solution:
    def maxSum(self, nums1: List[int], nums2: List[int]) -> int:
        i, j = 0, 0
        n1, n2 = len(nums1), len(nums2)
        # Running sum of each array since the last crossing point.
        sum1 = 0
        sum2 = 0
        result = 0
        while i < n1 and j < n2:
            if nums1[i] < nums2[j]:
                sum1 += nums1[i]
                i += 1
            elif nums1[i] > nums2[j]:
                sum2 += nums2[j]
                j += 1
            else:
                # Crossing point: lock in the better of the two segments,
                # plus the shared value itself (counted once), then reset.
                result += max(sum1, sum2) + nums1[i]
                sum1 = 0
                sum2 = 0
                i += 1
                j += 1
        # Drain whichever array still has a tail; no more crossings are
        # possible once one array is exhausted.
        while i < n1:
            sum1 += nums1[i]
            i += 1
        while j < n2:
            sum2 += nums2[j]
            j += 1
        result += max(sum1, sum2)
        return result % MOD
