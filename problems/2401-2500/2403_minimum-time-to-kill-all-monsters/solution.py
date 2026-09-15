from typing import List, Optional


class Solution:
    def minimumTime(self, power: List[int]) -> int:
        n = len(power)
        full = (1 << n) - 1
        INF = float("inf")
        # dp[mask] = min days to have defeated exactly the set `mask`.
        # The state suffices because the daily gain depends only on
        # |mask| and mana resets after every kill.
        dp = [INF] * (full + 1)
        dp[0] = 0
        # Increasing numeric order is a valid evaluation order: setting a
        # bit always yields a strictly larger mask, so each state is final
        # before anything extends it.
        for mask in range(full + 1):
            if dp[mask] == INF:
                continue
            gain = bin(mask).count("1") + 1
            for j in range(n):
                if not mask & (1 << j):
                    # Days to bank >= power[j] mana at `gain` per day.
                    days = (power[j] + gain - 1) // gain
                    nxt = mask | (1 << j)
                    if dp[mask] + days < dp[nxt]:
                        dp[nxt] = dp[mask] + days
        return dp[full]
