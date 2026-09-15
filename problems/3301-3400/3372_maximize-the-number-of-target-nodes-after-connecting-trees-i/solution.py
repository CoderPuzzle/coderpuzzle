from typing import List


class Solution:
    def maxTargetNodes(self, edges1: List[List[int]], edges2: List[List[int]], k: int) -> List[int]:
        # answer[i] = (nodes within k of i in tree 1) + max over v of
        # (nodes within k - 1 of v in tree 2): the connecting edge spends
        # one of the k steps, and queries are independent (hints 1-2). With
        # k = 0 the k - 1 limit floors to zero second-tree nodes. Layer BFS
        # is iterative — a 1000-node path would overflow the CPython
        # recursion limit.

        def build(edges):
            adj = [[] for _ in range(len(edges) + 1)]
            for a, b in edges:
                adj[a].append(b)
                adj[b].append(a)
            return adj

        def within(adj, start, limit):
            if limit < 0:
                return 0
            seen = [False] * len(adj)
            seen[start] = True
            frontier = [start]
            for _ in range(limit):
                nxt = []
                for u in frontier:
                    for w in adj[u]:
                        if not seen[w]:
                            seen[w] = True
                            nxt.append(w)
                if not nxt:
                    break
                frontier = nxt
            return sum(seen)

        adj1, adj2 = build(edges1), build(edges2)
        best2 = max(within(adj2, v, k - 1) for v in range(len(adj2)))
        return [within(adj1, u, k) + best2 for u in range(len(adj1))]
