from typing import List


class Solution:
    def minCostToEqualizeArray(self, nums: List[int], cost1: int, cost2: int) -> int:
        # Everything ends at one shared target F >= max(nums). When a pair
        # op costs at least two single ops it never helps, so every deficit
        # is paid singly up to max(nums). Otherwise scan candidate targets:
        # a target's deficits are schedulable into at most min(T // 2,
        # T - peak) pair ops (the largest gap needs a partner each round)
        # and pairs are worth taking while cost2 < 2 * cost1, so only their
        # count matters. No optimum hides beyond 2 * max(nums): from there
        # on any two extra steps add exactly n * cost2 for the same shape
        # of schedule.
        mod = 10**9 + 7
        low, high, count = min(nums), max(nums), len(nums)
        base = sum(high - v for v in nums)
        if 2 * cost1 <= cost2:
            return base * cost1 % mod
        best = None
        total = base
        for target in range(high, 2 * high + 1):
            peak = target - low
            if 2 * peak <= total:
                pair, rest = divmod(total, 2)
            else:
                pair = total - peak
                rest = 2 * peak - total
            cost = pair * cost2 + rest * cost1
            if best is None or cost < best:
                best = cost
            total += count
        return best % mod
