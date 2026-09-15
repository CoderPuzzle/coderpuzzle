from typing import List


class Solution:
    def getCommon(self, nums1: List[int], nums2: List[int]) -> int:
        # Both arrays ascend, so the front runner carrying the smaller
        # value can never match anything ahead on the other side: drop it
        # and repeat. The first tie is necessarily the smallest shared
        # value; a drained side proves no common element exists.
        i = 0
        j = 0
        len1 = len(nums1)
        len2 = len(nums2)
        while i < len1 and j < len2:
            if nums1[i] == nums2[j]:
                return nums1[i]
            if nums1[i] < nums2[j]:
                i += 1
            else:
                j += 1
        return -1
