from typing import List, Optional


class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        MOD = 10**9 + 7
        # The pointer can never be farther than `steps` from index 0.
        n = min(arrLen, steps + 1)
        # dp[i] = number of ways to stand at position i after the moves
        # processed so far
        dp = [0] * n
        dp[0] = 1
        for _ in range(steps):
            ndp = [0] * n
            for i in range(n):
                # stay, or arrive from the left/right neighbor — both
                # guarded by the window bounds
                total = dp[i]
                if i > 0:
                    total += dp[i - 1]
                if i + 1 < n:
                    total += dp[i + 1]
                ndp[i] = total % MOD
            dp = ndp
        # walks that return to the origin after exactly `steps` moves
        return dp[0]
