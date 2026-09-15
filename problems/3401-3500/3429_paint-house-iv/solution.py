from typing import List


class Solution:
    def minCost(self, n: int, cost: List[List[int]]) -> int:
        # Paint equidistant pairs (k, n-1-k) outside-in. dp[a][b] is the
        # cheapest way to paint every pair so far, ending with outer colors
        # (a, b) — 9 states, because a pair only constrains the two houses
        # it touches in the next pair. Totals reach 10^10, past 32-bit.
        INF = float("inf")
        dp = [[INF] * 3 for _ in range(3)]
        for a in range(3):
            for b in range(3):
                if a != b:
                    dp[a][b] = cost[0][a] + cost[n - 1][b]
        for k in range(1, n // 2):
            left, right = cost[k], cost[n - 1 - k]
            # e[t][c]: best dp[t][b] over b != c — the previous right house
            # must differ from the new right one (adjacency on that side)
            e = [[min(dp[t][1], dp[t][2]), min(dp[t][0], dp[t][2]), min(dp[t][0], dp[t][1])] for t in range(3)]
            c0, c1, c2 = e[0]
            d0, d1, d2 = e[1]
            f0, f1, f2 = e[2]
            # the diagonal stays unreachable: a pair's two houses are mirrors
            # of each other and may not share a color; each column drops one
            # left color so the new left house differs from the old one
            dp = [
                [INF, left[0] + right[1] + min(d1, f1), left[0] + right[2] + min(d2, f2)],
                [left[1] + right[0] + min(c0, f0), INF, left[1] + right[2] + min(c2, f2)],
                [left[2] + right[0] + min(c0, d0), left[2] + right[1] + min(c1, d1), INF],
            ]
        return min(min(row) for row in dp)
