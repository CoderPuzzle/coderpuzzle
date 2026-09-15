from typing import List


class Solution:
    def minimumFinishTime(self, tires: List[List[int]], changeTime: int, numLaps: int) -> int:
        # Precompute best[x]: the cheapest time for x consecutive laps on
        # a single tire (any tire, no change). A run never helps once its
        # next lap costs more than resetting to the fastest first lap,
        # which caps useful run lengths at about 18 (ratios are >= 2).
        INF = 1 << 62
        fastest_first = min(fi for fi, _ in tires)
        best = [INF] * (numLaps + 1)
        for fi, ri in tires:
            total = 0
            lap = fi
            for x in range(1, numLaps + 1):
                total += lap
                if total < best[x]:
                    best[x] = total
                if lap >= changeTime + fastest_first or total > INF // ri:
                    break
                lap *= ri
        dp = [INF] * (numLaps + 1)
        dp[0] = 0
        for i in range(1, numLaps + 1):
            for x in range(1, i + 1):
                if best[x] == INF:
                    continue
                candidate = dp[i - x] + best[x]
                if i != x:
                    candidate += changeTime
                if candidate < dp[i]:
                    dp[i] = candidate
        return dp[numLaps]
