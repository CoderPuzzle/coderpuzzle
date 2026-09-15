from typing import List


class Solution:
    def minimumCost(self, start: List[int], target: List[int], specialRoads: List[List[int]]) -> int:
        # By hint 1 an optimal route only ever stops at road endpoints (plus
        # start and target): any other intermediate point is dominated by
        # walking straight past it. Build that candidate set deduped, join
        # every pair with a Manhattan-priced walk, add each special road as
        # one directed edge priced at its own cost, and run Dijkstra.
        points: List[tuple] = []
        index = {}

        def add(x: int, y: int) -> int:
            key = (x, y)
            if key not in index:
                index[key] = len(points)
                points.append(key)
            return index[key]

        start_id = add(start[0], start[1])
        target_id = add(target[0], target[1])
        roads = [(add(r[0], r[1]), add(r[2], r[3]), r[4]) for r in specialRoads]
        n = len(points)
        inf = 1 << 60
        dist = [inf] * n
        used = [False] * n
        dist[start_id] = 0
        for _ in range(n):
            # Nearest unvisited node scan keeps the code heap-free; with at
            # most ~402 candidates the quadratic cost is negligible.
            u = -1
            for v in range(n):
                if not used[v] and (u == -1 or dist[v] < dist[u]):
                    u = v
            if u == -1 or dist[u] == inf:
                break
            used[u] = True
            ux, uy = points[u]
            for v in range(n):
                if not used[v]:
                    walk = dist[u] + abs(points[v][0] - ux) + abs(points[v][1] - uy)
                    if walk < dist[v]:
                        dist[v] = walk
            for a, b, cost in roads:
                if a == u and dist[u] + cost < dist[b]:
                    dist[b] = dist[u] + cost
        return dist[target_id]
