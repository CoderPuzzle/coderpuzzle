from typing import List


class Solution:
    def placedCoins(self, edges: List[List[int]], cost: List[int]) -> List[int]:
        # Per subtree keep the three largest and the two smallest cost
        # values: the maximum product of three distinct nodes is either the
        # three largest or the two smallest times the largest. Subtrees can
        # be one long chain (n up to 2 * 10**4), so the traversal collects
        # parents by BFS and merges children in reverse BFS order.
        n = len(cost)
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        parent = [-1] * n
        order = [0]
        head = 0
        while head < len(order):
            u = order[head]
            head += 1
            for v in adj[u]:
                if v != parent[u]:
                    parent[v] = u
                    order.append(v)

        size = [1] * n
        top = [[cost[u]] for u in range(n)]  # up to 3 largest, descending
        bot = [[cost[u]] for u in range(n)]  # up to 2 smallest, ascending
        ans = [0] * n
        for u in reversed(order):
            if size[u] < 3:
                ans[u] = 1
            else:
                t = top[u]
                b = bot[u]
                best = max(t[0] * t[1] * t[2], b[0] * b[1] * t[0])
                ans[u] = best if best > 0 else 0
            p = parent[u]
            if p >= 0:
                size[p] += size[u]
                top[p] = sorted(top[p] + top[u], reverse=True)[:3]
                bot[p] = sorted(bot[p] + bot[u])[:2]
        return ans
