from typing import List, Optional


class Solution:
    def gardenNoAdj(self, n: int, paths: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n + 1)]
        for x, y in paths:
            adj[x].append(y)
            adj[y].append(x)

        color = [0] * (n + 1)
        for i in range(1, n + 1):
            used = {color[j] for j in adj[i] if color[j] != 0}
            for c in (1, 2, 3, 4):
                if c not in used:
                    color[i] = c
                    break

        return color[1:]
