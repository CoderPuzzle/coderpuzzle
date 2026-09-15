from typing import List, Optional


class Solution:
    def minCost(self, maxTime: int, edges: List[List[int]], passingFees: List[int]) -> int:
        n = len(passingFees)
        INF = float("inf")
        # Unfold the graph into layers indexed by exact arrival time:
        # layers[t][c] = min fee of any walk from city 0 arriving at c at
        # minute t exactly. Within one time layer, minimizing cost is
        # well-defined, so revisiting a city at a different time stays legal.
        layers = [None] * (maxTime + 1)
        start = [INF] * n
        start[0] = passingFees[0]
        layers[0] = start
        for t in range(1, maxTime + 1):
            cur = [INF] * n
            for x, y, dt in edges:
                if dt > t:  # edge cannot fit in the elapsed time
                    continue
                # Relax both directions from the layer exactly dt minutes ago.
                prev = layers[t - dt]
                if prev[x] + passingFees[y] < cur[y]:
                    cur[y] = prev[x] + passingFees[y]
                if prev[y] + passingFees[x] < cur[x]:
                    cur[x] = prev[y] + passingFees[x]
            layers[t] = cur
        # Destination may be reached before maxTime: take the min over all
        # time layers; all-infinity means no feasible walk.
        best = min(layer[n - 1] for layer in layers)
        return best if best < INF else -1
