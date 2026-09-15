from typing import List, Optional


class Solution:
    def minCost(self, nums: List[int], cost: List[int]) -> int:
        # The cost sum(|nums[i]-t|*cost[i]) is convex piecewise-linear in t;
        # its slope flips where cumulative cost crosses half the total, so
        # the optimum is the weighted median.
        pairs = sorted(zip(nums, cost))
        total = sum(cost)
        target = (total + 1) // 2
        prefix = 0
        median = pairs[-1][0]
        # Walk sorted values until the prefix weight reaches ceil(total/2);
        # >= with the +1 picks the lower median on an even split (same cost).
        for num, c in pairs:
            prefix += c
            if prefix >= target:
                median = num
                break
        return sum(abs(num - median) * c for num, c in pairs)
