from typing import List, Optional


class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        nums = sorted(nums)
        total = sum(nums)
        # Try candidate longest sides from the largest down; stop at i == 2 so
        # at least three sides remain. The first prefix that closes wins.
        for i in range(len(nums) - 1, 1, -1):
            # A multiset forms a polygon iff the largest side is smaller than
            # the sum of all the others.
            if total - nums[i] > nums[i]:
                return total
            # This largest side is hopeless: the smaller sides can never
            # outweigh it, so discard it and try the next candidate.
            total -= nums[i]
        return -1
