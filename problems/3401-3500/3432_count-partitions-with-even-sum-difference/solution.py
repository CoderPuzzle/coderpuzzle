from typing import List


class Solution:
    def countPartitions(self, nums: List[int]) -> int:
        # left - right = total - 2 * right, and twice any integer is even, so
        # every partition's difference carries the total's parity: either all
        # n - 1 splits are even (total even) or none is (total odd).
        return len(nums) - 1 if sum(nums) % 2 == 0 else 0
