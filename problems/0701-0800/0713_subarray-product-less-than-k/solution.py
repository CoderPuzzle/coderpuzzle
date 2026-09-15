from typing import List, Optional


class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        # Products are at least 1 (elements >= 1), so k <= 1 admits nothing.
        if k <= 1:
            return 0
        count = 0
        product = 1
        left = 0
        for right, value in enumerate(nums):
            product *= value
            # Shrink from the left until [left, right] is the longest window
            # ending here with product strictly below k.
            while product >= k:
                product //= nums[left]
                left += 1
            # Every subwindow also ends at right and has a smaller product:
            # right - left + 1 subarrays, each counted once by its right end.
            count += right - left + 1
        return count
