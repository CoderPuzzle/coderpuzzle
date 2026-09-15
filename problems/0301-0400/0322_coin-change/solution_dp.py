from typing import List, Optional


class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # dp[a] = fewest coins for amount a; dp[0] = 0, every other amount
        # starts unreachable (inf doubles as the no-solution marker).
        inf = float("inf")
        dp = [0] + [inf] * amount
        # Amounts smallest-first, so dp[a - c] is already final when consulted.
        for a in range(1, amount + 1):
            best = inf
            # Try every coin as the last one used: dp[a] = min(dp[a - c] + 1).
            for c in coins:
                if c <= a and dp[a - c] + 1 < best:
                    best = dp[a - c] + 1
            dp[a] = best
        return -1 if dp[amount] == inf else dp[amount]
