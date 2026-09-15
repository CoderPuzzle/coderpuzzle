import heapq


class Solution:
    def shortestPath(self, n: int, edges: list[list[int]], labels: str, k: int) -> int:
        g = [[] for _ in range(n)]
        for u, v, w in edges:
            g[u].append((v, w))
        inf = 10**30
        d = [[inf] * (k + 1) for _ in range(n)]
        d[0][1] = 0
        q = [(0, 0, 1)]
        while q:
            x, u, c = heapq.heappop(q)
            if x != d[u][c]:
                continue
            for v, w in g[u]:
                nc = c + 1 if labels[u] == labels[v] else 1
                if nc <= k and x + w < d[v][nc]:
                    d[v][nc] = x + w
                    heapq.heappush(q, (x + w, v, nc))
        z = min(d[n - 1])
        return -1 if z == inf else z
