from typing import List


class Solution:
    def numberOfPaths(self, n: int, corridors: List[List[int]]) -> int:
        degree = [0] * (n + 1)
        for u, v in corridors:
            degree[u] += 1
            degree[v] += 1

        forward = [set() for _ in range(n + 1)]
        for u, v in corridors:
            if (degree[u], u) > (degree[v], v):
                u, v = v, u
            forward[u].add(v)

        triangles = 0
        for u in range(1, n + 1):
            for v in forward[u]:
                for w in forward[u]:
                    if w in forward[v]:
                        triangles += 1
        return triangles
