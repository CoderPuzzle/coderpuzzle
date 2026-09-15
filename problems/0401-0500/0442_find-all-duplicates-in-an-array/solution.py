from typing import List


class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        # Values in [1, n] let the array index itself be the hash: value v
        # maps to slot v-1, and flipping that slot's sign records "v seen".
        # A slot already negative means |v| was visited before: a duplicate.
        duplicates = []
        for value in nums:
            index = abs(value) - 1
            if nums[index] < 0:
                duplicates.append(index + 1)
            else:
                nums[index] = -nums[index]
        # Restore every sign so the array is left as it was found, then emit
        # the ascending order this judge pins on the original's any-order
        # freedom.
        for index in range(len(nums)):
            nums[index] = abs(nums[index])
        duplicates.sort()
        return duplicates
