from typing import List


class Solution:
    def findIndices(self, nums: List[int], indexDifference: int, valueDifference: int) -> List[int]:
        # For each later index j, every legal partner t satisfies
        # t <= j - indexDifference, and the largest |nums[t] - nums[j]| over
        # that window is attained at its minimum or maximum, so remembering
        # the first index of each extreme as the window grows is enough.
        # Testing the minimum candidate before the maximum, and keeping
        # first occurrences on ties, pins one deterministic answer out of
        # the many the statement permits.
        n = len(nums)
        min_idx = -1
        max_idx = -1
        for j in range(n):
            t = j - indexDifference
            if t < 0:
                continue
            if min_idx == -1 or nums[t] < nums[min_idx]:
                min_idx = t
            if max_idx == -1 or nums[t] > nums[max_idx]:
                max_idx = t
            if abs(nums[j] - nums[min_idx]) >= valueDifference:
                return [min_idx, j]
            if abs(nums[j] - nums[max_idx]) >= valueDifference:
                return [max_idx, j]
        return [-1, -1]
