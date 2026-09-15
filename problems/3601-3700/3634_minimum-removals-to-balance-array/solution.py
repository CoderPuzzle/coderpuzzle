from typing import List


class Solution:
    def minRemoval(self, nums: List[int], k: int) -> int:
        # Sort so the best survivor set is a contiguous window: it is
        # balanced exactly when nums[j] <= nums[i] * k at its ends, and the
        # longest such window keeps the most elements.
        nums.sort()
        best = 0
        left = 0
        for right in range(len(nums)):
            # A one-element window is always balanced, so left never passes
            # right. The product reaches 1e14, which Python ints carry
            # exactly.
            while nums[right] > nums[left] * k:
                left += 1
            best = max(best, right - left + 1)
        return len(nums) - best
