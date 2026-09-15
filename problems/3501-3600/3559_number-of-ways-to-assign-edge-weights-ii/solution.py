from typing import List


class Solution:
    def assignEdgeWeights(self, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        # As in part I, a path of d edges has odd cost for exactly 2^(d-1)
        # of its 2^d assignments (d = 0 answers 0), so each query only
        # needs the path length d = depth[u] + depth[v] - 2 * depth[lca].
        # Binary lifting answers every LCA in O(log n); the tree is rooted
        # with an explicit stack because it can be a 10^5-node chain.
        MOD = 10**9 + 7
        n = len(edges) + 1
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        depth = [0] * (n + 1)
        parent = [0] * (n + 1)
        seen = [False] * (n + 1)
        seen[1] = True
        stack = [1]
        while stack:
            u = stack.pop()
            for v in adj[u]:
                if not seen[v]:
                    seen[v] = True
                    parent[v] = u
                    depth[v] = depth[u] + 1
                    stack.append(v)
        log = 1
        while (1 << log) < n:
            log += 1
        up = [parent]
        for k in range(1, log):
            prev = up[k - 1]
            up.append([prev[prev[v]] for v in range(n + 1)])
        p2 = [1] * n
        for i in range(1, n):
            p2[i] = p2[i - 1] * 2 % MOD
        answer = []
        for a, b in queries:
            u, v = (a, b) if depth[a] >= depth[b] else (b, a)
            du, dv = depth[u], depth[v]
            diff, k = du - dv, 0
            while diff:
                if diff & 1:
                    u = up[k][u]
                diff >>= 1
                k += 1
            if u != v:
                for k in range(log - 1, -1, -1):
                    if up[k][u] != up[k][v]:
                        u = up[k][u]
                        v = up[k][v]
                v = parent[u]
            d = du + dv - 2 * depth[v]
            answer.append(0 if d == 0 else p2[d - 1])
        return answer
