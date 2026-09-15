from typing import List


class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        # Scores grow with every extension: appending x to a window with sum
        # s and length l changes the score by s + x*l + x > 0 (all elements
        # are >= 1), so valid windows for a fixed right endpoint form a
        # suffix that only shrinks as right advances.
        total = 0
        window_sum = 0
        left = 0
        for right, value in enumerate(nums):
            window_sum += value
            while window_sum * (right - left + 1) >= k:
                window_sum -= nums[left]
                left += 1
            # The window is now the longest qualifying subarray ending at
            # right; every shorter suffix qualifies too.
            total += right - left + 1
        return total
