from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        length = len(nums)
        values = sorted(set(nums))
        left = 0
        kept = 0

        for right, value in enumerate(values):
            while value - values[left] >= length:
                left += 1
            kept = max(kept, right - left + 1)

        return length - kept
