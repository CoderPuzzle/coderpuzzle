from typing import List


class Solution:
    def canBeIncreasing(self, nums: List[int]) -> bool:
        # Single pass with a virtual removal. At the first violation
        # nums[i-1] >= nums[i], the one removal must be nums[i-1] or
        # nums[i]: drop nums[i-1] when the chain still rises through it
        # (i == 1 or nums[i-2] < nums[i]), else keep the old prev, which
        # amounts to dropping nums[i]. A second violation is fatal.
        prev = nums[0]
        removed = False
        for i in range(1, len(nums)):
            if nums[i] <= prev:
                if removed:
                    return False
                removed = True
                if i == 1 or nums[i - 2] < nums[i]:
                    prev = nums[i]
            else:
                prev = nums[i]
        return True
