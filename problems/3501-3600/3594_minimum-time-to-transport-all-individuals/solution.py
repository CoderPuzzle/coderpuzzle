import heapq
import math
from typing import List


class Solution:
    def minTime(self, n: int, k: int, m: int, time: List[int], mul: List[float]) -> float:
        # Dijkstra over (people-at-base mask, stage, boat side). Every leg
        # has a positive duration, so the first pop of a state is optimal.
        # Base side: cross any subgroup of size <= k; the stage advances by
        # floor(cross) % m. Destination side: one of the people already
        # across rows back while anyone remains at the base.
        full = (1 << n) - 1
        # groups[mask] = subgroups of mask holding 1..k people.
        groups = [[] for _ in range(full + 1)]
        for mask in range(full + 1):
            sub = mask
            while sub:
                if bin(sub).count("1") <= k:
                    groups[mask].append(sub)
                sub = (sub - 1) & mask
        # mx[s] = largest time[s] member: it sets the crossing time.
        mx = [0] * (full + 1)
        for i in range(n):
            mx[1 << i] = time[i]
        for s in range(1, full + 1):
            low = s & -s
            if s != low:
                mx[s] = max(mx[low], mx[s ^ low])
        INF = float("inf")
        heap = [(0.0, full, 0, 0)]
        dist = {}
        ans = None
        while heap:
            d, mask, j, side = heapq.heappop(heap)
            if dist.get((mask, j, side), INF) < d:
                continue
            if side == 0:
                for s in groups[mask]:
                    cross = mx[s] * mul[j]
                    nd = d + cross
                    rest = mask ^ s
                    if rest == 0:
                        # final crossing: nobody left behind, no return
                        if ans is None or nd < ans:
                            ans = nd
                    else:
                        key = (rest, (j + math.floor(cross)) % m, 1)
                        if nd < dist.get(key, INF):
                            dist[key] = nd
                            heapq.heappush(heap, (nd,) + key)
            else:
                for r in range(n):
                    if mask >> r & 1:
                        continue
                    ret = time[r] * mul[j]
                    key = (mask | 1 << r, (j + math.floor(ret)) % m, 0)
                    nd = d + ret
                    if nd < dist.get(key, INF):
                        dist[key] = nd
                        heapq.heappush(heap, (nd,) + key)
        return ans if ans is not None else -1.0
