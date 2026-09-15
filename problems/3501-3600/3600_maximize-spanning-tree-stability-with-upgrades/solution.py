from typing import List, Optional


class Solution:
    def maxStability(self, n: int, edges: List[List[int]], k: int) -> int:
        def feasible(x):
            parent = list(range(n))
            size = [1] * n

            def find(a):
                while parent[a] != a:
                    parent[a] = parent[parent[a]]
                    a = parent[a]
                return a

            def union(a, b):
                a = find(a)
                b = find(b)
                if a == b:
                    return False
                if size[a] < size[b]:
                    a, b = b, a
                parent[b] = a
                size[a] += size[b]
                return True

            for u, v, s, must in edges:
                if must == 1:
                    if s < x:
                        return False
                    if not union(u, v):
                        return False
            for u, v, s, must in edges:
                if must == 0 and s >= x:
                    union(u, v)
            upgrades = 0
            for u, v, s, must in edges:
                if must == 0 and s < x and 2 * s >= x:
                    if union(u, v):
                        upgrades += 1
                        if upgrades > k:
                            return False
            root = find(0)
            for i in range(1, n):
                if find(i) != root:
                    return False
            return True

        if not feasible(1):
            return -1
        lo, hi = 1, 200001  # si <= 1e5 so 2*si <= 2e5
        while lo + 1 < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid
        return lo
