from typing import List


class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        # Every window has length k, so the best average is the best window
        # sum divided by k once at the end: keep the sum in an exact integer
        # and let the single division decide precision.
        window = sum(nums[:k])
        best = window
        for index in range(k, len(nums)):
            window += nums[index] - nums[index - k]
            if window > best:
                best = window
        return best / k
