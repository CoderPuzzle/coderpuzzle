from typing import List, Optional


class Solution:
    def minScore(self, n: int, roads: List[List[int]]) -> int:
        # A path may reuse roads, so any road inside the connected
        # component of city 1 can be crossed on a detour and included in
        # the path's score. The answer is therefore the smallest distance
        # among the roads of that component. Union every road, then scan
        # for the minimum road fully inside city 1's component.
        parent = list(range(n + 1))

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        for a, b, _ in roads:
            union(a, b)

        root = find(1)
        best = 10**9
        for a, b, d in roads:
            if find(a) == root and d < best:
                best = d
        return best
