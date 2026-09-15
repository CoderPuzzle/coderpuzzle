from collections import deque
from typing import List


class Solution:
    def secondMinimum(self, n: int, edges: List[List[int]], time: int, change: int) -> int:
        graph = [[] for _ in range(n + 1)]
        for left, right in edges:
            graph[left].append(right)
            graph[right].append(left)

        infinity = 1 << 30
        first = [infinity] * (n + 1)
        second = [infinity] * (n + 1)
        first[1] = 0
        queue = deque([(1, 0)])

        while queue:
            vertex, distance = queue.popleft()
            next_distance = distance + 1
            for neighbor in graph[vertex]:
                if next_distance < first[neighbor]:
                    second[neighbor] = first[neighbor]
                    first[neighbor] = next_distance
                    queue.append((neighbor, next_distance))
                elif first[neighbor] < next_distance < second[neighbor]:
                    second[neighbor] = next_distance
                    queue.append((neighbor, next_distance))

        elapsed = 0
        for _ in range(second[n]):
            if (elapsed // change) % 2 == 1:
                elapsed = (elapsed // change + 1) * change
            elapsed += time
        return elapsed
