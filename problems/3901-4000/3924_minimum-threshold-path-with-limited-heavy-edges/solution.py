from collections import deque
from typing import List


class Solution:
    def minimumThreshold(self, n: int, edges: List[List[int]], source: int, target: int, k: int) -> int:
        if source == target:
            return 0
        graph = [[] for _ in range(n)]
        high = 0
        for u, v, weight in edges:
            graph[u].append((v, weight))
            graph[v].append((u, weight))
            high = max(high, weight)

        def feasible(threshold: int) -> bool:
            distance = [k + 1] * n
            distance[source] = 0
            queue = deque([source])
            while queue:
                node = queue.popleft()
                for neighbor, weight in graph[node]:
                    cost = int(weight > threshold)
                    candidate = distance[node] + cost
                    if candidate < distance[neighbor] and candidate <= k:
                        distance[neighbor] = candidate
                        if cost == 0:
                            queue.appendleft(neighbor)
                        else:
                            queue.append(neighbor)
            return distance[target] <= k

        if not feasible(high):
            return -1
        low = 0
        while low < high:
            middle = (low + high) // 2
            if feasible(middle):
                high = middle
            else:
                low = middle + 1
        return low
