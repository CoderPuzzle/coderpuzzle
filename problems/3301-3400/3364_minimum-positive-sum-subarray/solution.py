from typing import List


class Solution:
    def minimumSumSubarray(self, nums: List[int], l: int, r: int) -> int:
        # Prefix sums turn each candidate window into an O(1) subtraction,
        # so scanning every (start, length) pair is O(n^2) windows overall.
        # With n <= 100 and |nums[i]| <= 1000 every partial sum stays far
        # inside 32 bits.
        prefix = [0] * (len(nums) + 1)
        for i, value in enumerate(nums):
            prefix[i + 1] = prefix[i] + value
        best = -1
        for start in range(len(nums)):
            for length in range(l, r + 1):
                end = start + length
                if end > len(nums):
                    break
                total = prefix[end] - prefix[start]
                if total > 0 and (best == -1 or total < best):
                    best = total
        return best
