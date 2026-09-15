from typing import List, Optional


class Solution:
    def assignBikes(self, workers: List[List[int]], bikes: List[List[int]]) -> int:
        # Bitmask DP over the set of used bikes; dp[mask] is the cheapest way
        # to assign the first popcount(mask) workers using exactly those bikes.
        n, m = len(workers), len(bikes)
        dist = [[abs(wx - bx) + abs(wy - by) for bx, by in bikes] for wx, wy in workers]
        inf = float("inf")
        dp = [inf] * (1 << m)
        dp[0] = 0
        best = inf
        for mask in range(1 << m):
            if dp[mask] == inf:
                continue
            assigned = bin(mask).count("1")
            if assigned == n:
                if dp[mask] < best:
                    best = dp[mask]
                continue
            for b in range(m):
                if not mask >> b & 1:
                    candidate = dp[mask] + dist[assigned][b]
                    nxt = mask | (1 << b)
                    if candidate < dp[nxt]:
                        dp[nxt] = candidate
        return best
