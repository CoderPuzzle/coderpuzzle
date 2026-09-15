from typing import List, Optional


class Solution:
    def minimumCost(self, n: int, edges: List[List[int]], query: List[List[int]]) -> List[int]:
        # Walks may repeat edges, so the optimum ANDs in every edge of the component.
        parent = list(range(n))
        size = [1] * n

        # Union-find: path halving in find, union by size in union.
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra == rb:
                return ra
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]
            return ra

        for u, v, _ in edges:
            union(u, v)

        # AND every edge weight into its component, keyed by root.
        comp_and = {}
        for u, v, w in edges:
            r = find(u)
            if r not in comp_and:
                comp_and[r] = w
            else:
                comp_and[r] &= w

        # Different roots mean no walk exists; same root answers with the AND.
        ans = []
        for s, t in query:
            rs, rt = find(s), find(t)
            if rs != rt:
                ans.append(-1)
            else:
                ans.append(comp_and[rs])
        return ans
