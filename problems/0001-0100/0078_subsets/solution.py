from typing import List


class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        subsets: List[List[int]] = []
        # Count masks upward from all bits clear ([]) to all bits set (the
        # whole array): bit i set means nums[i] is in the subset.
        for mask in range(1 << n):
            current: List[int] = []
            for i in range(n):
                # Bit i set: nums[i] joins, in input order within the subset.
                if mask & (1 << i):
                    current.append(nums[i])
            subsets.append(current)
        return subsets
