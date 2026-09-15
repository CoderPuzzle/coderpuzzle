from typing import List, Optional


class Solution:
    def minEdgeReversals(self, n: int, edges: List[List[int]]) -> List[int]:
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append((v, 0))  # traversing u -> v costs 0
            graph[v].append((u, 1))  # traversing v -> u costs 1 (reversal)
        parent = [-1] * n
        order = [0]
        for x in order:
            for y, _ in graph[x]:
                if y != parent[x]:
                    parent[y] = x
                    order.append(y)

        dp = [0] * n
        for x in reversed(order):
            for y, cost in graph[x]:
                if parent[y] == x:
                    dp[x] += dp[y] + cost

        ans = [0] * n
        ans[0] = dp[0]
        for x in order:
            for y, cost in graph[x]:
                if parent[y] == x:
                    ans[y] = ans[x] + (1 if cost == 0 else -1)
        return ans
