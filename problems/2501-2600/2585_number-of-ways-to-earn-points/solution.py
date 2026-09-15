from typing import List


class Solution:
    def waysToReachTarget(self, target: int, types: List[List[int]]) -> int:
        # Bounded knapsack over score: dp[p] counts ways to hit exactly p
        # points using types processed so far. Each type contributes one
        # fresh row — questions of a type are indistinguishable, so only
        # HOW MANY of them are taken matters, and the per-point sum runs
        # over every legal take count q <= min(count, points // marks).
        mod = 10**9 + 7
        dp = [1] + [0] * target
        for count, marks in types:
            nxt = [0] * (target + 1)
            for points in range(target + 1):
                max_take = min(count, points // marks)
                total = 0
                for taken in range(max_take + 1):
                    total += dp[points - taken * marks]
                # <= 51 residues below 10^9 + 7 sum to < 5.5 * 10^10,
                # so the deferred reduction never leaves 64-bit range.
                nxt[points] = total % mod
            dp = nxt
        return dp[target]
