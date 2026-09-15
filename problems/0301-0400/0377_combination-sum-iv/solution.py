from typing import List


class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        # Order matters, so the table is indexed by the total alone: each
        # sequence reaching t is identified by its last element, making
        # ways[t] the sum of ways[t - x] over every final pick x <= t.
        # Python ints never overflow, so the running counts are safe as-is.
        ways = [0] * (target + 1)
        ways[0] = 1  # the empty sequence: exactly one way to build 0
        for t in range(1, target + 1):
            for x in nums:
                if x <= t:
                    ways[t] += ways[t - x]
        return ways[target]
