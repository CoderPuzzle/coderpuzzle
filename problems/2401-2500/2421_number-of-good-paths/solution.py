from typing import List, Optional


class Solution:
    def numberOfGoodPaths(self, vals: List[int], edges: List[List[int]]) -> int:
        n = len(vals)
        parent = list(range(n))
        size = [1] * n

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]

        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        by_value = {}
        for i, v in enumerate(vals):
            by_value.setdefault(v, []).append(i)

        answer = 0
        # Activate nodes in increasing value order: when the value-v group
        # is processed, smaller values are already merged, so unions only
        # ever connect components whose nodes are all <= v.
        for v in sorted(by_value):
            for u in by_value[v]:
                # Union across edges to already-active (<= v) endpoints: the
                # value-v nodes are then connected exactly through paths
                # whose interior nodes are all <= v.
                for w in adj[u]:
                    if vals[w] <= v:
                        union(u, w)
            # Group this value's nodes by component; a component holding c
            # of them yields c*(c-1)/2 good paths (each unordered pair).
            component_count = {}
            for u in by_value[v]:
                r = find(u)
                component_count[r] = component_count.get(r, 0) + 1
            for c in component_count.values():
                answer += c * (c - 1) // 2

        # Every single node is a good path on its own.
        return answer + n
