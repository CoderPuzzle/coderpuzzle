from typing import List


class Solution:
    def wiggleSort(self, nums: List[int]) -> List[int]:
        # Sort a copy, then fill the even slots from the back of the lower
        # half and the odd slots from the back of the upper half: reversing
        # each half keeps median duplicates as far apart as possible.
        ordered = sorted(nums)
        m = (len(nums) + 1) // 2
        nums[0::2] = ordered[:m][::-1]
        nums[1::2] = ordered[m:][::-1]
        return nums
