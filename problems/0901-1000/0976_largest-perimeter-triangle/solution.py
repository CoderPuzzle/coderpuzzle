from typing import List


class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        # Sort ascending: the maximal-perimeter triangle, if one exists,
        # sits on three consecutive sorted entries, so a scan from the top
        # decides the answer.
        nums.sort()
        for i in range(len(nums) - 3, -1, -1):
            # Strict inequality only: the two smaller sides summing to the
            # largest is a zero-area line, not a triangle.
            if nums[i] + nums[i + 1] > nums[i + 2]:
                return nums[i] + nums[i + 1] + nums[i + 2]
        return 0
