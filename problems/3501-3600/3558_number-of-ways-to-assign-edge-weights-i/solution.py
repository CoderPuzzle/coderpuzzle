from typing import List


class Solution:
    def assignEdgeWeights(self, edges: List[List[int]]) -> int:
        # A weight of 2 never changes parity, so only the number of 1s on
        # the path to a deepest node matters: any odd-size subset of the
        # d = max depth edges gives an odd cost, and there are 2^(d-1) of
        # those. An iterative DFS finds d (the tree can be a long chain).
        MOD = 10**9 + 7
        n = len(edges) + 1
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        depth = [-1] * (n + 1)
        depth[1] = 0
        stack = [1]
        max_depth = 0
        while stack:
            u = stack.pop()
            for v in adj[u]:
                if depth[v] < 0:
                    depth[v] = depth[u] + 1
                    if depth[v] > max_depth:
                        max_depth = depth[v]
                    stack.append(v)
        return pow(2, max_depth - 1, MOD)
