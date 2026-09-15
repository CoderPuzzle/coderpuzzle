from typing import List, Optional


class Solution:
    def moveZeroes(self, nums: List[int]) -> List[int]:
        # Invariant: nums[:slow] is the stabilized prefix of non-zero values
        # in their original order; nums[slow:fast] holds only zeros.
        slow = 0
        for fast in range(len(nums)):
            if nums[fast] != 0:
                # Swap the non-zero into its slot. While slow == fast (no
                # zeros seen yet) this is a self-exchange, so each element
                # moves at most once; a zero is left to join the tail.
                nums[slow], nums[fast] = nums[fast], nums[slow]
                slow += 1
        return nums
