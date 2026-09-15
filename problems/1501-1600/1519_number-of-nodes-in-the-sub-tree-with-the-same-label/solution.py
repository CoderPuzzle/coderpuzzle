from typing import List


class Solution:
    def countSubTrees(self, n: int, edges: List[List[int]], labels: str) -> List[int]:
        # Adjacency list for the undirected tree.
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Breadth-first order from the root: parents are always recorded
        # before their children, so reading this list backwards visits
        # every child before its parent -- an iterative post-order, with
        # no recursion (and so no call-stack limit) involved.
        order = [0] * n
        parent = [-1] * n
        visited = [False] * n
        visited[0] = True
        head, tail = 0, 1
        while head < tail:
            u = order[head]
            head += 1
            for v in adj[u]:
                if not visited[v]:
                    visited[v] = True
                    parent[v] = u
                    order[tail] = v
                    tail += 1

        # counts[i] tallies, per letter, how many nodes folded into i's
        # subtree so far carry that letter.
        counts = [[0] * 26 for _ in range(n)]
        for i in range(n):
            counts[i][ord(labels[i]) - 97] += 1

        # Reverse breadth-first order folds children into parents only
        # after every one of their own descendants has already folded in.
        for idx in range(n - 1, 0, -1):
            u = order[idx]
            p = parent[u]
            cu, cp = counts[u], counts[p]
            for c in range(26):
                cp[c] += cu[c]

        return [counts[i][ord(labels[i]) - 97] for i in range(n)]
