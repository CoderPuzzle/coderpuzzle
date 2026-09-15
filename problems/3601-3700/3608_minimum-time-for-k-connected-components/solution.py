from typing import List, Optional


class Solution:
    def minTime(self, n: int, edges: List[List[int]], k: int) -> int:
        parent = list(range(n))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra == rb:
                return False
            parent[ra] = rb
            return True

        # Reverse Kruskal: sweep edges from longest-lived to shortest so the
        # union-find mirrors the graph with every edge of time <= t removed.
        ordered = sorted(edges, key=lambda e: -e[2])
        components = n
        answer = 0
        i = 0
        m = len(ordered)
        while i < m:
            t = ordered[i][2]
            # Pre-merge state: every edge of time <= t is gone. If the count
            # already reaches k, t works; later overwrites keep the minimum.
            if components >= k:
                answer = t
            # Merge the whole equal-time group so a partially merged group is
            # never mistaken for a valid intermediate state.
            while i < m and ordered[i][2] == t:
                u, v, _ = ordered[i]
                # A redundant edge (no-op union) does not decrement the count.
                if union(u, v):
                    components -= 1
                i += 1
        # The full graph itself may already have >= k components: answer 0.
        if components >= k:
            answer = 0
        return answer
