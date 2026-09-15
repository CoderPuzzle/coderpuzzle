from typing import List


class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        # Flipping a 0 turns it into a 1 for free, so a stretch can be
        # made all-ones exactly when it holds at most one 0: sweep for
        # the longest such window. Grow it one element at a time on the
        # right; when a second 0 slips in, advance the left edge until
        # the earlier 0 drops out and the one-flip budget is restored.
        # The largest window seen is the answer.
        best = left = zeros = 0
        for right, value in enumerate(nums):
            if value == 0:
                zeros += 1
            while zeros > 1:
                if nums[left] == 0:
                    zeros -= 1
                left += 1
            best = max(best, right - left + 1)
        return best
