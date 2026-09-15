from typing import List


class Solution:
    def minMoves(self, nums: List[int]) -> int:
        # Only increments exist, so every element must climb to a common
        # target at least as high as the largest value already present;
        # the cheapest such target is that largest value itself.
        target = max(nums)
        # Each element pays exactly its own deficit to reach it, and the
        # moves never interact, so the answer sums the deficits directly.
        return sum(target - num for num in nums)
