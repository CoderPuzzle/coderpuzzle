from typing import List


class Solution:
    def findValueOfPartition(self, nums: List[int]) -> int:
        # A partition's value is the distance between one cross-side pair: the
        # largest element of nums1 against the smallest of nums2. No partition
        # can beat the closest two values in the whole array, and a split
        # around that closest sorted pair realizes it exactly.
        nums = sorted(nums)
        best = nums[1] - nums[0]
        for i in range(2, len(nums)):
            best = min(best, nums[i] - nums[i - 1])
        return best
