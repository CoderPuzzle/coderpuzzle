from typing import List, Optional


class Solution:
    def numberOfEdgesAdded(self, n: int, edges: List[List[int]]) -> int:
        parent = list(range(n))
        rank = [0] * n
        par = [0] * n  # xor distance from node to its parent in the DSU tree

        def find(x):
            if parent[x] != x:
                root, xr = find(parent[x])
                par[x] ^= xr
                parent[x] = root
            return parent[x], par[x]

        added = 0
        for u, v, w in edges:
            ru, xu = find(u)
            rv, xv = find(v)
            if ru == rv:
                if (xu ^ xv) == w:
                    added += 1
            else:
                rel = xu ^ xv ^ w
                if rank[ru] < rank[rv]:
                    parent[ru] = rv
                    par[ru] = rel
                elif rank[ru] > rank[rv]:
                    parent[rv] = ru
                    par[rv] = rel
                else:
                    parent[ru] = rv
                    par[ru] = rel
                    rank[rv] += 1
                added += 1
        return added
