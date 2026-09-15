from typing import List, Optional


class Solution:
    def minimumMountainRemovals(self, nums: List[int]) -> int:
        n = len(nums)
        # lis[i]: longest strictly increasing subsequence ending at i
        # (strict comparisons — plateaus can ride neither slope).
        lis = [1] * n
        for i in range(n):
            for j in range(i):
                if nums[j] < nums[i] and lis[j] + 1 > lis[i]:
                    lis[i] = lis[j] + 1
        # lds[i]: symmetric strictly decreasing chain starting at i,
        # built by scanning right to left.
        lds = [1] * n
        for i in range(n - 1, -1, -1):
            for j in range(i + 1, n):
                if nums[j] < nums[i] and lds[j] + 1 > lds[i]:
                    lds[i] = lds[j] + 1
        # Minimizing removals = maximizing mountain length. A valid peak
        # needs at least one element on each side, and the peak is counted
        # by both tables, hence the -1.
        best = 0
        for i in range(n):
            if lis[i] >= 2 and lds[i] >= 2:
                best = max(best, lis[i] + lds[i] - 1)
        return n - best
