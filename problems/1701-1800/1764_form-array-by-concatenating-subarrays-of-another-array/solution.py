from typing import List


class Solution:
    def canChoose(self, groups: List[List[int]], nums: List[int]) -> bool:
        # Each group must land in a disjoint, in-order window of nums, and
        # the earliest window always dominates: shifting a group onto its
        # first still-legal occurrence never causes an overlap and only
        # lengthens the suffix left for the groups behind it. So walk the
        # groups in order with a cursor pos into nums, take the first
        # start >= pos whose window compares equal element by element,
        # advance the cursor past it, and fail as soon as a group has no
        # window left.
        pos = 0
        for group in groups:
            size = len(group)
            start = pos
            while start + size <= len(nums) and nums[start : start + size] != group:
                start += 1
            if start + size > len(nums):
                return False
            pos = start + size
        return True
