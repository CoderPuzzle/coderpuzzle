from typing import List, Optional
import heapq


class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        graph = [[] for _ in range(n)]
        for f, t, price in flights:
            graph[f].append((t, price))
        # State = (cost, node, flights taken). Carrying the count in the
        # state is what enforces the limit: a state that already used its
        # k+1 flights is never allowed to board another.
        heap = [(0, src, 0)]
        best = [float("inf")] * n
        while heap:
            cost, node, edges = heapq.heappop(heap)
            # The heap pops in cost order, so the first dst pop is final.
            if node == dst:
                return cost
            # Dominance prune: a cheaper state that used no more flights was
            # already expanded here, so this one cannot lead anywhere new.
            if edges > best[node]:
                continue
            best[node] = edges
            if edges < k + 1:
                for nxt, price in graph[node]:
                    heapq.heappush(heap, (cost + price, nxt, edges + 1))
        return -1
