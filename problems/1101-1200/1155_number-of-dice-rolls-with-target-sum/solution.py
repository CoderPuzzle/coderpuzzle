from typing import List, Optional


class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        MOD = 10**9 + 7
        # dp[t]: ways for the dice processed so far to show sum t
        dp = [0] * (target + 1)
        # zero dice reach sum 0 in exactly one way
        dp[0] = 1
        for _ in range(n):
            # fresh table per die: the transition must read only the
            # previous die's distribution, else one die could count twice
            ndp = [0] * (target + 1)
            for t in range(1, target + 1):
                s = 0
                # every face value f is a distinct outcome, so all faces are
                # summed; min(k, t) skips faces that overshoot the target
                for f in range(1, min(k, t) + 1):
                    s += dp[t - f]
                ndp[t] = s % MOD
            dp = ndp
        # targets no die sequence reaches were never written, so read as 0
        return dp[target]
