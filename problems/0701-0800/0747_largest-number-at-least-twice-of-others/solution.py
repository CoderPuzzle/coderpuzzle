from typing import List


class Solution:
    def dominantIndex(self, nums: List[int]) -> int:
        # One pass for the top two values: the largest dominates exactly when
        # it is at least twice the runner-up, since every other element is at
        # most that runner-up.
        best, second = 0, -1
        for i in range(1, len(nums)):
            if nums[i] > nums[best]:
                second = nums[best]
                best = i
            elif nums[i] > second:
                second = nums[i]
        # The boundary is inclusive: "at least twice" keeps max == 2 * second.
        return best if nums[best] >= 2 * second else -1
