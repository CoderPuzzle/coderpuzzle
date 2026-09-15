from typing import List
from bisect import bisect_right


class Solution:
    def countPairs(self, n: int, edges: List[List[int]], queries: List[int]) -> List[int]:
        # Degrees count every parallel edge separately, so for a pair (a, b)
        # the degree sum counts an edge shared by both endpoints twice:
        # incident(a, b) = deg[a] + deg[b] - mult(a, b).
        deg = [0] * (n + 1)
        mult = {}
        for u, v in edges:
            deg[u] += 1
            deg[v] += 1
            key = (u, v) if u < v else (v, u)
            mult[key] = mult.get(key, 0) + 1
        d = sorted(deg[1:])
        # For each pair joined by at least one edge, s is the degree sum and
        # t the true incident count. A query k overcounts exactly the pairs
        # with t <= k < s, so the fix adds #{s <= k} - #{t <= k}.
        s_vals = []
        t_vals = []
        for (u, v), m in mult.items():
            s = deg[u] + deg[v]
            s_vals.append(s)
            t_vals.append(s - m)
        s_vals.sort()
        t_vals.sort()
        answer = []
        for k in queries:
            # Two pointers over the sorted degrees count every unordered
            # pair whose degree sum is strictly above k.
            lo, hi = 0, n - 1
            total = 0
            while lo < hi:
                if d[lo] + d[hi] > k:
                    total += hi - lo
                    hi -= 1
                else:
                    lo += 1
            total += bisect_right(s_vals, k) - bisect_right(t_vals, k)
            answer.append(total)
        return answer
