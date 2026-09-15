from typing import List, Optional


class Solution:
    def minimumTotalPrice(self, n: int, edges: List[List[int]], price: List[int], trips: List[List[int]]) -> int:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Undiscounted cost is sum(price[i] * freq[i]), so counting how
        # many trip paths pass through each node decouples routing from
        # the discount choice.
        freq = [0] * n
        for trip in trips:
            start, end = trip[0], trip[1]
            parent = [-1] * n
            visited = [False] * n
            stack = [start]
            visited[start] = True
            while stack:
                v = stack.pop()
                if v == end:
                    break
                for u in adj[v]:
                    if not visited[u]:
                        visited[u] = True
                        parent[u] = v
                        stack.append(u)
            # Walking back from end through parent pointers touches
            # exactly the unique trip path; halting after start also
            # covers the trivial start == end trip.
            cur = end
            while cur != -1:
                freq[cur] += 1
                if cur == start:
                    break
                cur = parent[cur]

        # Classic independent-set tree DP: dfs returns the min subtree
        # cost with v's price kept full (dp0) versus halved (dp1).
        def dfs(v, p):
            dp0 = price[v] * freq[v]
            dp1 = (price[v] // 2) * freq[v]
            for u in adj[v]:
                if u == p:
                    continue
                c0, c1 = dfs(u, v)
                # A full node accepts children of either state; a halved
                # node forces its children full since discounts apply
                # only to non-adjacent nodes.
                dp0 += min(c0, c1)
                dp1 += c0
            return dp0, dp1

        # The answer is the better of the two root states.
        return min(dfs(0, -1))
