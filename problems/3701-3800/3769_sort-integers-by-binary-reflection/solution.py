from typing import List


class Solution:
    def sortByReflection(self, nums: List[int]) -> List[int]:
        # Reflect every value once — reverse its binary string and parse it
        # back, which drops any leading zeros the reversal produced — then
        # sort on the composite key (reflection, value) so ties break by
        # ascending original value regardless of sort stability.
        return sorted(nums, key=lambda value: (int(bin(value)[2:][::-1], 2), value))
