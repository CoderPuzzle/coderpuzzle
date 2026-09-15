from collections import deque
from typing import List


class Solution:
    def reachableNodes(self, n: int, edges: List[List[int]], restricted: List[int]) -> int:
        # One breadth-first sweep from node 0 over the tree, never entering a
        # restricted node; every dequeued node is counted exactly once.
        blocked = set(restricted)
        adjacent: list[list[int]] = [[] for _ in range(n)]
        for a, b in edges:
            adjacent[a].append(b)
            adjacent[b].append(a)
        visited = [False] * n
        visited[0] = True
        queue = deque([0])
        reached = 0
        while queue:
            node = queue.popleft()
            reached += 1
            for neighbor in adjacent[node]:
                if not visited[neighbor] and neighbor not in blocked:
                    visited[neighbor] = True
                    queue.append(neighbor)
        return reached
