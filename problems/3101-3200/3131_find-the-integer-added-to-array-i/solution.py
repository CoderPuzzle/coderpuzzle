from typing import List


class Solution:
    def addedInteger(self, nums1: List[int], nums2: List[int]) -> int:
        # Adding one constant x to every element of nums1 shifts its minimum
        # by exactly x, so x = min(nums2) - min(nums1) is forced; the input
        # guarantee promises that this x reproduces nums2's multiset, and
        # any pair admitting some x admits only one. Values stay in
        # [-1000, 1000], far inside 32-bit range.
        return min(nums2) - min(nums1)
