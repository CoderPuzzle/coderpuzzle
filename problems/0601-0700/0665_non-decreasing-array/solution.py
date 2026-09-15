from typing import List


class Solution:
    def checkPossibility(self, nums: List[int]) -> bool:
        # Count descents nums[i] < nums[i-1]: a second one is unfixable,
        # since one modified element repairs at most the two pairs
        # touching it. At the first, repair in place: lower nums[i-1] to
        # nums[i] when the pair before it allows (i == 1 or
        # nums[i-2] <= nums[i]), else raise nums[i] to nums[i-1].
        # Lowering keeps the pair ahead as easy as it can be; raising
        # only makes it harder.
        modified = False
        for i in range(1, len(nums)):
            if nums[i] < nums[i - 1]:
                if modified:
                    return False
                modified = True
                if i == 1 or nums[i - 2] <= nums[i]:
                    nums[i - 1] = nums[i]
                else:
                    nums[i] = nums[i - 1]
        return True
