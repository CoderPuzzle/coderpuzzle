from typing import List, Optional
from collections import defaultdict


class Solution:
    def validArrangement(self, pairs: List[List[int]]) -> List[List[int]]:
        # Numbers are nodes, pairs are directed edges: the arrangement is an
        # Eulerian path (a walk using every edge exactly once).
        adj = defaultdict(list)
        indeg = defaultdict(int)
        outdeg = defaultdict(int)
        for u, v in pairs:
            adj[u].append(v)
            outdeg[u] += 1
            indeg[v] += 1

        # The unique out-in == 1 node must start the walk; when all degrees
        # balance (Eulerian circuit) any edge-bearing node works — pairs[0][0].
        start = pairs[0][0]
        for u in outdeg:
            if outdeg[u] - indeg[u] == 1:
                start = u
                break

        # Iterative Hierholzer (explicit stack — 1e5 edges would overflow
        # recursion): deepen while unused edges remain; a node joins `path`
        # only when stuck, so unwinding emits dead-ends first.
        stack = [start]
        path = []
        while stack:
            u = stack[-1]
            if adj[u]:
                stack.append(adj[u].pop())  # O(1) edge consumption from the end
            else:
                path.append(u)
                stack.pop()

        # Reversal restores walk order; consecutive nodes are the arranged pairs.
        path.reverse()
        return [[path[i], path[i + 1]] for i in range(len(path) - 1)]
