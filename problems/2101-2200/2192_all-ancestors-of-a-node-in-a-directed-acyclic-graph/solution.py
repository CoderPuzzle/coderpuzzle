from typing import List


class Solution:
    def getAncestors(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        # Reverse every edge; then the ancestors of v are exactly the
        # nodes reachable from v in the reversed graph. BFS per node and
        # emit visited nodes (minus the start) in ascending order.
        from collections import deque

        rev = [[] for _ in range(n)]
        for u, v in edges:
            rev[v].append(u)

        answer = []
        for start in range(n):
            seen = [False] * n
            seen[start] = True
            queue = deque([start])
            while queue:
                node = queue.popleft()
                for prev in rev[node]:
                    if not seen[prev]:
                        seen[prev] = True
                        queue.append(prev)
            answer.append([u for u in range(n) if seen[u] and u != start])
        return answer
