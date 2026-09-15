from typing import List


class Solution:
    def minimumSum(self, nums1: List[int], nums2: List[int]) -> int:
        # For a shared value the two indices are independent, so its best
        # good pair is its first occurrence in each array: minimizing i and
        # j separately minimizes i + j. Record every value's first index in
        # nums1, never overwriting an earlier one.
        first_index = {}
        for i, value in enumerate(nums1):
            if value not in first_index:
                first_index[value] = i
        # One pass over nums2: every value the map knows scores
        # first_index[nums2[j]] + j, and the smallest score wins. The flag
        # stays -1 when nothing matched.
        best = -1
        for j, value in enumerate(nums2):
            if value in first_index:
                total = first_index[value] + j
                if best == -1 or total < best:
                    best = total
        return best
