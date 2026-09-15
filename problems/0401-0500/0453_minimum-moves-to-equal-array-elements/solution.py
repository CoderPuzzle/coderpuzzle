from typing import List


class Solution:
    def minMoves(self, nums: List[int]) -> int:
        # Incrementing n - 1 elements is, in relative terms, decrementing the
        # one element left out: every pairwise gap moves exactly as it would
        # if that single element had dropped by 1. So the question becomes how
        # many unit decrements make all elements equal, and since decrements
        # never lift anything, the common target is the current minimum.
        return sum(nums) - min(nums) * len(nums)
