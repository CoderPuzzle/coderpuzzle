from typing import List, Optional


class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Kadane's algorithm: `current` is the best sum of a subarray ending
        # exactly here; every optimal subarray ends somewhere, so the answer
        # is the max of `current` over all indices.
        # Seeding with nums[0] (not 0) is what makes all-negative inputs come
        # out right: an empty-prefix 0 must not be allowed to win.
        best = current = nums[0]
        for value in nums[1:]:
            # Extend the best subarray ending at the previous index, or start
            # fresh: a negative running sum can only drag down what follows.
            current = value if current < 0 else current + value
            if current > best:
                best = current
        return best
