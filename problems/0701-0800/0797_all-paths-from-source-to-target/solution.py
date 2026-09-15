from typing import List, Optional


class Solution:
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        n = len(graph)
        target = n - 1
        paths = []

        def dfs(node, path):
            # The graph is acyclic, so every walk from 0 is a simple
            # path and DFS can never loop; at the target, snapshot a
            # copy and stop.
            if node == target:
                paths.append(path[:])
                return
            for nxt in graph[node]:
                # Backtrack: pop after returning so sibling branches
                # each see a clean path. No visited set is needed —
                # paths legitimately share prefixes.
                path.append(nxt)
                dfs(nxt, path)
                path.pop()

        dfs(0, [0])
        return paths
