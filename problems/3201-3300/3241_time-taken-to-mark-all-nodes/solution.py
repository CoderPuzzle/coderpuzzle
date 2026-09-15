from typing import List, Optional


class Solution:
    def timeTaken(self, edges: List[List[int]]) -> List[int]:
        # Reroot DP. Moving into node v costs 1 if v is odd, 2 if v is even.
        n = len(edges) + 1
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        # Iterative DFS ordering rooted at 0.
        parent = [-1] * n
        order = []
        stack = [0]
        parent[0] = -2
        while stack:
            u = stack.pop()
            order.append(u)
            for v in adj[u]:
                if v == parent[u]:
                    continue
                parent[v] = u
                stack.append(v)

        last = [0] * n  # max marking time within u's subtree (downward)
        last_no = [-1] * n  # child attaining last[u]
        second = [0] * n  # second-best child contribution
        for u in reversed(order):
            for v in adj[u]:
                if v == parent[u]:
                    continue
                t = last[v] + (2 if v % 2 == 0 else 1)
                if last[u] < t:
                    second[u] = last[u]
                    last[u] = t
                    last_no[u] = v
                elif second[u] < t:
                    second[u] = t

        answer = last[:]
        up = [0] * n  # best time outside u's subtree (path through u's parent)
        for u in order:
            for v in adj[u]:
                if v == parent[u]:
                    continue
                if v == last_no[u]:
                    pl = max(up[u], second[u]) + (2 if u % 2 == 0 else 1)
                else:
                    pl = max(up[u], last[u]) + (2 if u % 2 == 0 else 1)
                up[v] = pl
                if pl > answer[v]:
                    answer[v] = pl
        return answer
