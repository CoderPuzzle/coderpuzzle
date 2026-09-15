from typing import List, Optional


class Solution:
    def minOperations(self, nums: List[int], target: List[int]) -> int:
        # Choosing x rewrites exactly the cells whose current value is x (all
        # maximal x-segments land on their target values), so a mismatched
        # cell keeps its value until an operation names that value. Naming a
        # value clears its whole mismatch class; no other cell moves. The
        # answer is the number of classes: distinct nums[i] where it differs
        # from target[i]. The count is at most n <= 1e5, so every integer
        # type in range carries it.
        distinct = set()
        for value, want in zip(nums, target):
            if value != want:
                distinct.add(value)
        return len(distinct)
