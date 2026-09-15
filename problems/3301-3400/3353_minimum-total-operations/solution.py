from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # Adding k to a prefix touches exactly one adjacent difference: the
        # one straddling the prefix's end. A whole-array prefix shifts every
        # element equally and a difference can be zeroed by picking k as
        # that difference, so each operation removes at most one nonzero
        # adjacent difference - and every nonzero one is removable.
        return sum(1 for i in range(1, len(nums)) if nums[i] != nums[i - 1])
