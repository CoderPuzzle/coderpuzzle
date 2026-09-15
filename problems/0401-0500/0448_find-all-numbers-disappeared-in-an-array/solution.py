from typing import List


class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        # Values in [1, n] let the array index itself be the hash: value v
        # maps to slot v-1, and flipping that slot's sign records "v seen".
        # A value that never appears leaves its slot positive.
        for value in nums:
            index = abs(value) - 1
            if nums[index] > 0:
                nums[index] = -nums[index]
        # A second sweep reads the marks: slot i positive means i+1 never
        # appeared, so it is collected; negative marks are restored on the
        # way out, leaving the array exactly as it arrived. Index order is
        # value order, so the pinned ascending output is free.
        disappeared = []
        for index in range(len(nums)):
            if nums[index] > 0:
                disappeared.append(index + 1)
            else:
                nums[index] = -nums[index]
        return disappeared
