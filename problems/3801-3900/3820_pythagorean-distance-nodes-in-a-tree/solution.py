from typing import List


class Solution:
    def specialNodes(self, n: int, edges: List[List[int]], x: int, y: int, z: int) -> int:
        adjacency = [[] for _ in range(n)]
        for u, v in edges:
            adjacency[u].append(v)
            adjacency[v].append(u)

        # Every tree edge has unit weight, so a breadth-first search from a
        # target reaches nodes in increasing distance order. The explicit
        # frontier list keeps a 10^5-node path off the call stack.
        def distances(source: int) -> List[int]:
            dist = [-1] * n
            dist[source] = 0
            frontier = [source]
            for node in frontier:
                for neighbor in adjacency[node]:
                    if dist[neighbor] < 0:
                        dist[neighbor] = dist[node] + 1
                        frontier.append(neighbor)
            return dist

        dx = distances(x)
        dy = distances(y)
        dz = distances(z)

        answer = 0
        for node in range(n):
            a, b, c = sorted((dx[node], dy[node], dz[node]))
            if a * a + b * b == c * c:
                answer += 1
        return answer
