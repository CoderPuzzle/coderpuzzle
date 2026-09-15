from typing import List, Optional
import heapq
from collections import defaultdict


class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        graph = defaultdict(list)
        for u, v, w in times:
            graph[u].append((v, w))

        dist = {}
        heap = [(0, k)]
        while heap:
            d, u = heapq.heappop(heap)
            # Lazy stale-entry handling: skip nodes settled by an earlier pop.
            if u in dist:
                continue
            # Non-negative weights make the first pop the true shortest distance,
            # so u is final now and never revisited.
            dist[u] = d
            for v, w in graph[u]:
                if v not in dist:
                    heapq.heappush(heap, (d + w, v))

        # Fewer than n settled nodes means something is unreachable from k.
        if len(dist) != n:
            return -1
        # The last node to hear the signal sets the answer.
        return max(dist.values())
