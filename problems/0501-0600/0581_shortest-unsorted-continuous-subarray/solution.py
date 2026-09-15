from typing import List


class Solution:
    def findUnsortedSubarray(self, nums: List[int]) -> int:
        # Scan left to right carrying the running max: an element below the
        # running max is out of place, and the LAST such index is the
        # window's right edge; a right-to-left pass with the running min
        # finds the left edge. Strict < and > keep equal values out.
        n = len(nums)
        start = end = -1
        running_max = float("-inf")
        for i in range(n):
            if nums[i] < running_max:
                end = i
            else:
                running_max = nums[i]
        running_min = float("inf")
        for i in range(n - 1, -1, -1):
            if nums[i] > running_min:
                start = i
            else:
                running_min = nums[i]
        return 0 if end == -1 else end - start + 1
