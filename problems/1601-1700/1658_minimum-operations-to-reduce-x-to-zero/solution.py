from typing import List, Optional


class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        total = sum(nums)
        target = total - x  # find the longest middle subarray summing to target
        if target < 0:
            return -1
        if target == 0:
            return len(nums)
        best = -1
        window = 0
        left = 0
        for right, value in enumerate(nums):
            window += value
            while window > target:
                window -= nums[left]
                left += 1
            if window == target:
                best = max(best, right - left + 1)
        if best == -1:
            return -1
        return len(nums) - best
