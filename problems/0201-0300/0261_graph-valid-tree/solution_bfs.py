from collections import deque


class Solution:
    def validTree(self, n: int, edges: list[list[int]]) -> bool:
        # A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
        # more cannot stay acyclic — any other count fails immediately.
        if len(edges) != n - 1:
            return False
        adjacency = [[] for _ in range(n)]
        for a, b in edges:
            adjacency[a].append(b)
            adjacency[b].append(a)
        # With n - 1 edges on the table, connectivity is the only open
        # question: connected + n - 1 edges forces the graph to be a tree.
        seen = [False] * n
        seen[0] = True
        queue = deque([0])
        visited = 1
        while queue:
            u = queue.popleft()
            for v in adjacency[u]:
                if not seen[v]:
                    seen[v] = True
                    visited += 1
                    queue.append(v)
        return visited == n
