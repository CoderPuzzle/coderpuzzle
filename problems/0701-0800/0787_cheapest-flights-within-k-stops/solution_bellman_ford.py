from typing import List, Optional


class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        INF = float("inf")
        # After r full rounds, dist[v] is the cheapest fare using at
        # most r edges; k stops allow k+1 flights, so run k+1 rounds.
        dist = [INF] * n
        dist[src] = 0
        for _ in range(k + 1):
            # Relax from a frozen copy: writing in place would chain
            # several edges inside one round and exceed the stop limit.
            ndist = dist[:]
            changed = False
            for f, t, price in flights:
                if dist[f] + price < ndist[t]:
                    ndist[t] = dist[f] + price
                    changed = True
            dist = ndist
            # A round that changed nothing never improves later rounds.
            if not changed:
                break
        # Non-negative prices need no negative-cycle handling; a
        # surviving infinity means the destination is unreachable
        # within the allowance.
        return -1 if dist[dst] == INF else dist[dst]
