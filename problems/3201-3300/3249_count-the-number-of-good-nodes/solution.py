from typing import List


class Solution:
    def countGoodNodes(self, edges: List[List[int]]) -> int:
        n = len(edges) + 1

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

        # Reverse breadth-first order folds subtree sizes bottom-up: once
        # the fold reaches a node, every one of its descendants has
        # already been folded in, so size[i] ends as the number of nodes
        # in i's subtree.
        size = [1] * n
        for idx in range(n - 1, 0, -1):
            u = order[idx]
            size[parent[u]] += size[u]

        # A node is good when its children's subtree sizes all agree.
        # Scanning children against their parent's first child's size
        # decides every node; leaves are never anyone's child-comparator
        # and stay good outright.
        is_good = [True] * n
        seen_child = [False] * n
        first_size = [0] * n
        for idx in range(1, n):
            v = order[idx]
            p = parent[v]
            if not seen_child[p]:
                seen_child[p] = True
                first_size[p] = size[v]
            elif size[v] != first_size[p]:
                is_good[p] = False
        return sum(is_good)
