from typing import List


class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        # dp[a] = number of combinations summing exactly to a; dp[0] = 1
        # is the empty combination.
        dp = [0] * (amount + 1)
        dp[0] = 1
        # Coins outer, amounts inner: each multiset is built in one fixed
        # coin order, so combinations are counted once (reversed loops
        # would count permutations instead).
        for c in coins:
            # Ascending reads dp[a - c] already updated for this coin —
            # exactly what lets a denomination repeat (unbounded knapsack).
            for a in range(c, amount + 1):
                dp[a] += dp[a - c]
        return dp[amount]
