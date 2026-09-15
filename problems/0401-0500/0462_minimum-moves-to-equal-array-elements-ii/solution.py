from typing import List


class Solution:
    def minMoves2(self, nums: List[int]) -> int:
        # Each move shifts one element by one unit, so gathering everything
        # on a target t costs exactly sum |x - t| — and a sum of absolute
        # distances is minimized at the median. Pairing the sorted values
        # outermost-inward shows why: a pair pays its full gap wherever its
        # two elements meet, so any pivot between the two middles is
        # optimal, and the lower middle element is as good as any.
        nums.sort()
        pivot = nums[(len(nums) - 1) // 2]
        return sum(abs(value - pivot) for value in nums)
