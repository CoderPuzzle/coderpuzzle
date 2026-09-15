from typing import List, Optional


class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:
        n = len(cost)
        INF = 10**18
        # Paying for wall i covers time[i] + 1 walls — itself plus time[i]
        # the free painter paints meanwhile — so a paid set P succeeds iff
        # its weights sum to >= n. dp[j]: cheapest selection covering at
        # least j walls' worth of demand.
        dp = [INF] * (n + 1)
        dp[0] = 0
        for i in range(n):
            weight = time[i] + 1
            c = cost[i]
            # Descending j keeps each wall used at most once (0/1 knapsack);
            # the clamp folds surplus coverage back to the dp[0] origin,
            # sound because coverage beyond n is worthless.
            for j in range(n, 0, -1):
                src = j - weight if j >= weight else 0
                cand = dp[src] + c
                if cand < dp[j]:
                    dp[j] = cand
        return dp[n]
