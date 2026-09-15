from typing import List


class Solution:
    def maxScore(self, nums: List[int]) -> int:
        # In descending order the first k elements are always the k largest
        # values, so every prefix sum is simultaneously maximal across all
        # rearrangements; counting the positive running totals is optimal.
        nums.sort(reverse=True)
        total = 0
        score = 0
        for value in nums:
            total += value
            if total > 0:
                score += 1
        return score
