from typing import List, Optional


class Solution:
    def longestPath(self, parent: List[int], s: str) -> int:
        n = len(parent)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)

        # iterative DFS ordering (parents before children)
        order = []
        stack = [0]
        while stack:
            u = stack.pop()
            order.append(u)
            for v in children[u]:
                stack.append(v)

        best = 1
        down = [0] * n  # longest valid chain starting at u, going into its subtree
        for u in reversed(order):
            first = second = 0
            for v in children[u]:
                d = down[v] if s[v] != s[u] else 0
                if d > first:
                    second = first
                    first = d
                elif d > second:
                    second = d
            down[u] = first + 1
            if first + second + 1 > best:
                best = first + second + 1
        return best
