import heapq


class Solution:
    def minTimeMaxPower(self, n, edges, power, cost, source, target):
        g = [[] for _ in range(n)]
        for u, v, t in edges:
            g[u].append((v, t))
        I = 10**30
        d = [[I] * (power + 1) for _ in range(n)]
        d[source][power] = 0
        q = [(0, source, power)]
        while q:
            x, u, p = heapq.heappop(q)
            if x != d[u][p]:
                continue
            if p >= cost[u]:
                np = p - cost[u]
                for v, t in g[u]:
                    if x + t < d[v][np]:
                        d[v][np] = x + t
                        heapq.heappush(q, (x + t, v, np))
        z = min(d[target])
        return [-1, -1] if z == I else [z, max(p for p in range(power + 1) if d[target][p] == z)]
