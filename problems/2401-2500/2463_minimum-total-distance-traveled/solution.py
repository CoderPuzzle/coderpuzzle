from typing import List, Optional


class Solution:
    def minimumTotalDistance(self, robot: List[int], factory: List[List[int]]) -> int:
        # Optimal plans are non-crossing (triangle inequality), so after
        # sorting, each factory serves a contiguous block of robots in order.
        robot = sorted(robot)
        factory = sorted(factory, key=lambda x: (x[0], x[1]))
        n = len(robot)
        INF = float("inf")
        # dp[i] = min distance to repair the first i robots with the
        # factories processed so far; only i = 0 is reachable initially.
        dp = [INF] * (n + 1)
        dp[0] = 0
        for pos, limit in factory:
            # pref[i] = sum of |robot[j] - pos| for j < i: prefix differences
            # give any contiguous block's distance to this factory.
            pref = [0]
            for r in robot:
                pref.append(pref[-1] + abs(r - pos))
            ndp = dp[:]
            for i in range(1, n + 1):
                # dp[i] carried over = skip this factory (zero assignments).
                best = dp[i]
                # This factory absorbs the trailing t robots i-t..i-1.
                for t in range(1, min(limit, i) + 1):
                    if dp[i - t] == INF:
                        continue
                    val = dp[i - t] + pref[i] - pref[i - t]
                    if val < best:
                        best = val
                ndp[i] = best
            dp = ndp
        return dp[n]
