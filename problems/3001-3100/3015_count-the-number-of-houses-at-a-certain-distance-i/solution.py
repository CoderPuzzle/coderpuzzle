from collections import deque
from typing import List


class Solution:
    def countOfPairs(self, n: int, x: int, y: int) -> List[int]:
        adjacency = [[] for _ in range(n + 1)]
        for house in range(1, n):
            adjacency[house].append(house + 1)
            adjacency[house + 1].append(house)
        if x != y:
            adjacency[x].append(y)
            adjacency[y].append(x)

        result = [0] * n
        for source in range(1, n + 1):
            # Breadth-first distances from source over the chain plus the
            # extra street; every other house lands at distance >= 1.
            distance = [-1] * (n + 1)
            distance[source] = 0
            queue = deque([source])
            while queue:
                house = queue.popleft()
                for neighbor in adjacency[house]:
                    if distance[neighbor] < 0:
                        distance[neighbor] = distance[house] + 1
                        queue.append(neighbor)
            for target in range(1, n + 1):
                # Skip the source itself: its distance-zero pair belongs
                # to no bucket.
                if distance[target] > 0:
                    result[distance[target] - 1] += 1
        return result
