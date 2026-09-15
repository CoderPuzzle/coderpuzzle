from typing import List


class Solution:
    def maximumSubtreeSize(self, edges: List[List[int]], colors: List[int]) -> int:
        n = len(colors)

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

        # mono[v] says every node in v's subtree so far shares v's color;
        # size[v] is how many nodes that monochrome run holds.
        mono = [True] * n
        size = [1] * n
        best = 1

        # Reverse breadth-first order folds children into parents only
        # after every one of their own descendants has already folded in.
        # A mixed subtree poisons the parent outright; a clean one poisons
        # it on a color mismatch, otherwise it joins the parent's count.
        for idx in range(n - 1, -1, -1):
            u = order[idx]
            if mono[u]:
                best = max(best, size[u])
            p = parent[u]
            if p != -1:
                if not mono[u] or colors[u] != colors[p]:
                    mono[p] = False
                else:
                    size[p] += size[u]
        return best
