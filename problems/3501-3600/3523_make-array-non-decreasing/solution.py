from typing import List


class Solution:
    def maximumPossibleSize(self, nums: List[int]) -> int:
        # Every operation collapses a consecutive segment to its maximum, so
        # any reachable array is the segment maxes of a partition of nums
        # into consecutive blocks whose maxes are non-decreasing. Greedy from
        # the left: cut a new block at every element that reaches the running
        # maximum (a prefix high, equal included) — an exchange argument
        # shows the earliest possible cut is always safe, and absorbing a
        # smaller element into the current block never enables an extra cut
        # later. All values fit 32-bit: answers <= n <= 2e5.
        size = 0
        run_max = 0
        for x in nums:
            if x >= run_max:
                size += 1
                run_max = x
        return size
