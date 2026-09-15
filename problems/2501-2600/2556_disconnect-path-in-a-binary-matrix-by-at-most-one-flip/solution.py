from collections import deque
from typing import List


class Solution:
    def isPossibleToCutPath(self, grid: List[List[int]]) -> bool:
        # Only a 1->0 flip can ever help, so the game is decided by vertex
        # cuts of the monotone 1-cell DAG: at most one flip succeeds
        # exactly when fewer than two vertex-disjoint corner-to-corner
        # paths exist (Menger). Unit vertex capacities come from the
        # standard in/out split; every cell off some root-to-corner path
        # is skipped outright. Augmenting BFS stops early once flow 2
        # proves the answer false, so at most two searches ever run.
        m, n = len(grid), len(grid[0])
        count = m * n
        inf = count + 2
        arcs_to = []
        arcs_cap = []
        graph = [[] for _ in range(2 * count)]

        def connect(u, v, cap):
            graph[u].append(len(arcs_to))
            arcs_to.append(v)
            arcs_cap.append(cap)
            graph[v].append(len(arcs_to))
            arcs_to.append(u)
            arcs_cap.append(0)

        for i in range(m):
            row = grid[i]
            below = grid[i + 1] if i + 1 < m else None
            for j in range(n):
                if row[j] == 0:
                    continue
                corner = (i == 0 and j == 0) or (i == m - 1 and j == n - 1)
                connect(2 * (i * n + j), 2 * (i * n + j) + 1, inf if corner else 1)
                if j + 1 < n and row[j + 1] == 1:
                    connect(2 * (i * n + j) + 1, 2 * (i * n + j + 1), inf)
                if below is not None and below[j] == 1:
                    connect(2 * (i * n + j) + 1, 2 * ((i + 1) * n + j), inf)

        source = 0
        sink = 2 * (count - 1) + 1
        total = 0
        while total < 2:
            parent = [-1] * (2 * count)
            via = [-1] * (2 * count)
            parent[source] = source
            queue = deque([source])
            while queue and parent[sink] == -1:
                u = queue.popleft()
                for e in graph[u]:
                    v = arcs_to[e]
                    if arcs_cap[e] > 0 and parent[v] == -1:
                        parent[v] = u
                        via[v] = e
                        queue.append(v)
            if parent[sink] == -1:
                break
            v = sink
            while v != source:
                e = via[v]
                arcs_cap[e] -= 1
                arcs_cap[e ^ 1] += 1
                v = parent[v]
            total += 1
        return total < 2
