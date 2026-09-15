from typing import List


class Solution:
    def numberOfSets(self, n: int, maxDistance: int, roads: List[List[int]]) -> int:
        # n <= 10, so every closing set fits in a bitmask. Seed one matrix with
        # the minimum weight per pair (multiple roads are allowed); for each
        # candidate mask copy it and relax only through branches that survive —
        # a shortest path between survivors never needs a closed intermediate.
        # The set counts when every surviving pair is within maxDistance, and
        # leaving zero or one branch alive passes vacuously.
        INF = 10**8  # above any legal maxDistance; INF + INF stays in 32 bits
        weight = [[INF] * n for _ in range(n)]
        for branch in range(n):
            weight[branch][branch] = 0
        for u, v, w in roads:
            weight[u][v] = weight[v][u] = min(weight[u][v], w)
        count = 0
        for closed in range(1 << n):
            dist = [row[:] for row in weight]
            for k in range(n):
                if closed >> k & 1:
                    continue
                for i in range(n):
                    through = dist[i][k]
                    if through >= INF:
                        continue
                    for j in range(n):
                        if through + dist[k][j] < dist[i][j]:
                            dist[i][j] = through + dist[k][j]
            if all(
                dist[i][j] <= maxDistance
                for i in range(n)
                if not closed >> i & 1
                for j in range(n)
                if not closed >> j & 1
            ):
                count += 1
        return count
