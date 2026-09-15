from typing import List


class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        # One pass over prefix sums: the total and a running left sum give
        # both sides of index i, since right = total - left - nums[i].
        total = sum(nums)
        left = 0
        for i, x in enumerate(nums):
            if left == total - left - x:
                # The first qualifying index is the leftmost by construction.
                return i
            left += x
        return -1
