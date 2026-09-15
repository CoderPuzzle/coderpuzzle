from collections import deque
from typing import List


class Solution:
    def networkBecomesIdle(self, edges: List[List[int]], patience: List[int]) -> int:
        graph = [[] for _ in patience]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        distance = [-1] * len(patience)
        distance[0] = 0
        queue = deque([0])
        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if distance[neighbor] == -1:
                    distance[neighbor] = distance[node] + 1
                    queue.append(neighbor)

        last_arrival = 0
        for server in range(1, len(patience)):
            round_trip = 2 * distance[server]
            last_send = ((round_trip - 1) // patience[server]) * patience[server]
            last_arrival = max(last_arrival, last_send + round_trip)
        return last_arrival + 1
