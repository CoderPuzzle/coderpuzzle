from typing import List


class Solution:
    def findIntersectionValues(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # answer1 counts indices whose value exists anywhere in the other
        # array; existence, not multiplicity, is what matters, so the only
        # state needed is each array's set of distinct values.
        set1, set2 = set(nums1), set(nums2)
        return [
            sum(1 for x in nums1 if x in set2),
            sum(1 for y in nums2 if y in set1),
        ]
