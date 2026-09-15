from typing import List, Optional


class Solution:
    def sortEvenOdd(self, nums: List[int]) -> List[int]:
        # Strides 2 and 1-from-2 split the array by index parity; sorting
        # each slice its own direction and writing back through the same
        # strides re-interleaves them without touching positions.
        result = nums[:]
        result[::2] = sorted(nums[::2])
        result[1::2] = sorted(nums[1::2], reverse=True)
        return result
