from typing import List

INF = float("inf")


class Solution:
    def minCost(self, houses: List[int], cost: List[List[int]], m: int, n: int, target: int) -> int:
        # dp[j][k]: min cost for houses settled so far, last color j (1-based),
        # k neighborhoods used.
        dp: List[List[float]] = [[INF] * (target + 1) for _ in range(n + 1)]
        if houses[0] != 0:
            dp[houses[0]][1] = 0
        else:
            for j in range(1, n + 1):
                dp[j][1] = cost[0][j - 1]
        for i in range(1, m):
            ndp: List[List[float]] = [[INF] * (target + 1) for _ in range(n + 1)]
            colors = [houses[i]] if houses[i] != 0 else range(1, n + 1)
            for j in colors:
                cj = 0 if houses[i] != 0 else cost[i][j - 1]
                for pj in range(1, n + 1):
                    row = dp[pj]
                    same = pj == j
                    for k in range(1, target + 1):
                        v = row[k]
                        if v == INF:
                            continue
                        nk = k if same else k + 1
                        if nk <= target and v + cj < ndp[j][nk]:
                            ndp[j][nk] = v + cj
            dp = ndp
        best = min(dp[j][target] for j in range(1, n + 1))
        return -1 if best == INF else int(best)
