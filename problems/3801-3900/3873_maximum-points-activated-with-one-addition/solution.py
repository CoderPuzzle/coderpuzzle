from typing import List


class Solution:
    def maxActivated(self, points: List[List[int]]) -> int:
        # Union every pair of points that share an x or a y coordinate.
        # The activation closure of any point is exactly its component, and
        # a new point can touch at most two components, so the optimum joins
        # the two largest (or everything, when there is one component).
        n = len(points)
        parent = list(range(n))
        size = [1] * n

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]

        xmap: dict[int, int] = {}
        ymap: dict[int, int] = {}
        for i, (x, y) in enumerate(points):
            if x in xmap:
                union(i, xmap[x])
            else:
                xmap[x] = i
            if y in ymap:
                union(i, ymap[y])
            else:
                ymap[y] = i

        comp: dict[int, int] = {}
        for i in range(n):
            r = find(i)
            comp[r] = comp.get(r, 0) + 1
        sizes = sorted(comp.values(), reverse=True)
        if len(sizes) == 1:
            return n + 1
        return sizes[0] + sizes[1] + 1
