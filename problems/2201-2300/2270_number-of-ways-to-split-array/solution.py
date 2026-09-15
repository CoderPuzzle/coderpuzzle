from typing import List


class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        # A rolling prefix sum plus the precomputed total decides each split
        # in O(1); the right half is simply total - prefix. Prefix sums reach
        # +/-10^10 here, so typed languages keep them 64-bit.
        total = sum(nums)
        prefix = 0
        count = 0
        for i in range(len(nums) - 1):
            prefix += nums[i]
            if prefix >= total - prefix:
                count += 1
        return count
