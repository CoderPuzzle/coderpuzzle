from typing import List, Optional


class Solution:
    def minCost(self, n: int, edges: List[List[int]], k: int) -> int:
        # k >= n lets every node sit alone: no cut is ever needed.
        if k >= n:
            return 0

        def feasible(t):
            parent = list(range(n))

            def find(x):
                while parent[x] != x:
                    parent[x] = parent[parent[x]]
                    x = parent[x]
                return x

            # Keep only edges of weight <= t: the union-find then holds exactly
            # the components left after cutting every heavier edge, and any
            # further removal only increases the count, so t works iff <= k.
            comps = n
            for u, v, w in edges:
                if w <= t:
                    ru = find(u)
                    rv = find(v)
                    if ru != rv:
                        parent[ru] = rv
                        comps -= 1
            return comps <= k

        # Weights are >= 1, so t = 0 keeps no edges; if even the edgeless
        # split fits in k parts, nothing needs cutting.
        if feasible(0):
            return 0
        # Feasibility is monotone in t and only changes at edge weights, so
        # binary search the sorted distinct weights for the smallest feasible.
        weights = sorted({w for _, _, w in edges})
        lo, hi = 0, len(weights) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(weights[mid]):
                hi = mid
            else:
                lo = mid + 1
        return weights[lo]
