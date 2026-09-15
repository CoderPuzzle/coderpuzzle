from typing import List


class Solution:
    def maximumPoints(self, edges: List[List[int]], coins: List[int], k: int) -> int:
        n = len(coins)
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Root at 0 once: BFS fixes parents and a top-down visit order, so
        # every later pass walks flat arrays and nothing recurses (a path
        # tree is 10^5 deep).
        parent = [-1] * n
        order = [0]
        for u in order:
            for v in adj[u]:
                if parent[v] == -1 and v != 0:
                    parent[v] = u
                    order.append(v)

        # dp[v][t] = best points from v's subtree when t ancestral halvings
        # already apply to coins[v]. Halving composes with the shift and
        # coins <= 10^4 < 2^14 die after 14 halvings, so the table is 15
        # wide; column 15 stays 0 forever (the absorbed state).
        s = [[0] * 16 for _ in range(n)]
        dp = [[0] * 16 for _ in range(n)]
        for v in reversed(order):
            c = coins[v]
            row = s[v]
            best = dp[v]
            for t in range(15):
                # First way: take the k hit (it may be negative). Second
                # way: halve, and the children inherit t + 1.
                way1 = (c >> t) - k + row[t]
                way2 = (c >> (t + 1)) + row[t + 1]
                best[t] = way1 if way1 > way2 else way2
            p = parent[v]
            if p >= 0:
                sp = s[p]
                for t in range(15):
                    sp[t] += best[t]
        return dp[0][0]
