from typing import List


class Solution:
    def minIncrease(self, n: int, edges: List[List[int]], cost: List[int]) -> int:
        # Scores can only be raised, so every root-to-leaf path must reach
        # M = largest raw path sum. Let f[v] be the largest raw path sum
        # through v; the total raise owed inside v's subtree is g[v] = M -
        # f[v]. g never decreases downward, so an increase is unavoidable
        # exactly when g[v] > g[parent]: that jump cannot be charged any
        # higher. Counting those jumps needs f, i.e. a down/up tree walk.
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        # Iterative rooted ordering (trees here can be a single long path).
        parent = [0] * n
        order = [0]
        seen = [False] * n
        seen[0] = True
        for v in order:
            for w in adj[v]:
                if not seen[w]:
                    seen[w] = True
                    parent[w] = v
                    order.append(w)
        # Pass 1 (bottom-up): down[v] = largest raw suffix sum v..leaf.
        down = [0] * n
        for v in reversed(order):
            best = 0
            for w in adj[v]:
                if parent[w] == v and down[w] > best:
                    best = down[w]
            down[v] = cost[v] + best
        # Pass 2 (top-down): f[v] = raw prefix above v + down[v]; propagate
        # the running minimum of f, and count the strict drops of f, which
        # are exactly the jumps of g.
        prefix = [0] * n
        prefix[0] = cost[0]
        f = [0] * n
        f[0] = down[0]
        ans = 0
        for v in order[1:]:
            p = parent[v]
            prefix[v] = prefix[p] + cost[v]
            fv = prefix[p] + down[v]
            if fv < f[p]:
                ans += 1
                f[v] = fv
            else:
                f[v] = f[p]
        return ans
