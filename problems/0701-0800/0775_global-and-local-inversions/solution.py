from typing import List


class Solution:
    def isIdealPermutation(self, nums: List[int]) -> bool:
        # Every local inversion is also a global one, so the two counts are
        # equal exactly when no pair (k, i) with k <= i - 2 has
        # nums[k] > nums[i]. Scan left to right holding the max of
        # nums[0..i-2]; an element below it is such a non-local inversion.
        prefix_max = 0
        for i in range(1, len(nums)):
            if nums[i] < prefix_max:
                return False
            if nums[i - 1] > prefix_max:
                prefix_max = nums[i - 1]
        return True
