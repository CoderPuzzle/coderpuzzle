from typing import List, Optional


class Solution:
    def minimumK(self, nums: List[int]) -> int:
        # An element v needs ceil(v / k) reduce-by-k operations, so
        # nonPositive(nums, k) is the sum of those ceilings. Feasibility
        # is monotone in k: every ceiling only shrinks as k grows while
        # k * k strictly grows, so binary search finds the smallest
        # feasible k.
        def feasible(k: int) -> bool:
            total = 0
            for value in nums:
                total += (value + k - 1) // k
            return total <= k * k

        # Warm-up: once k >= max(nums) every ceiling is exactly 1, so
        # nonPositive(nums, k) == n there; doubling max(nums) until it is
        # feasible therefore stops at the first power-of-two multiple
        # with k * k >= n, after at most a handful of doublings.
        hi = max(nums)
        while not feasible(hi):
            hi *= 2
        lo = 1
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
