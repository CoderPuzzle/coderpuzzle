from typing import List


class Solution:
    def minimumAverageDifference(self, nums: List[int]) -> int:
        total = sum(nums)
        prefix = 0
        best_index = 0
        best_diff = float("inf")
        n = len(nums)
        for i, x in enumerate(nums):
            prefix += x
            left_avg = prefix // (i + 1)
            right_count = n - i - 1
            right_avg = (total - prefix) // right_count if right_count else 0
            diff = abs(left_avg - right_avg)
            if diff < best_diff:
                best_diff = diff
                best_index = i
        return best_index
