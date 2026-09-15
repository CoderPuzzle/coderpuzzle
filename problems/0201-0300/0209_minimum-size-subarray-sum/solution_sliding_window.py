from typing import List, Optional


class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        n = len(nums)
        # Sentinel: an impossible length that survives when target is never met.
        best = n + 1
        window = 0
        left = 0
        for right in range(n):
            window += nums[right]
            # Positive elements make the window sum monotone under both
            # pointer moves, so the smallest left end for each right only
            # moves rightward — both pointers make at most n steps.
            while window >= target:
                best = min(best, right - left + 1)
                # Shrink from the left to reach the minimal window ending
                # here and leave the leanest state for the next extension.
                window -= nums[left]
                left += 1
        return 0 if best == n + 1 else best
