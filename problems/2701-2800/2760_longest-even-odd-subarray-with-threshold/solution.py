from typing import List


class Solution:
    def longestAlternatingSubarray(self, nums: List[int], threshold: int) -> int:
        best = 0
        i = 0
        while i < len(nums):
            # A window can only open here if nums[i] is even and within the
            # threshold; an odd or over-threshold element never starts a run.
            if nums[i] % 2 != 0 or nums[i] > threshold:
                i += 1
                continue
            # Stretch the right edge while parities alternate and every
            # element stays within the threshold.
            j = i + 1
            while j < len(nums) and nums[j] % 2 != nums[j - 1] % 2 and nums[j] <= threshold:
                j += 1
            best = max(best, j - i)
            # Sub-windows inside [i, j) are all shorter than this one, so
            # resume at the breaker: if it can start a window, it will.
            i = j
        return best
