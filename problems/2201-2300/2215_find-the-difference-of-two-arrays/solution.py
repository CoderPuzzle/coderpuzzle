from typing import List


class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        # Set membership answers "present in the other array" in O(1); the
        # surviving distinct values are emitted ascending for judging.
        set1 = set(nums1)
        set2 = set(nums2)
        only1 = sorted(set1 - set2)
        only2 = sorted(set2 - set1)
        return [only1, only2]
