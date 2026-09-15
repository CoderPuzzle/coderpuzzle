from typing import List


class Solution:
    def maximalPathQuality(self, values: List[int], edges: List[List[int]], maxTime: int) -> int:
        graph = [[] for _ in values]
        for left, right, travel_time in edges:
            graph[left].append((right, travel_time))
            graph[right].append((left, travel_time))

        visits = [0] * len(values)
        visits[0] = 1
        best = values[0]

        def search(node: int, elapsed: int, quality: int) -> None:
            nonlocal best
            if node == 0:
                best = max(best, quality)

            for neighbor, travel_time in graph[node]:
                next_time = elapsed + travel_time
                if next_time > maxTime:
                    continue
                first_visit = visits[neighbor] == 0
                visits[neighbor] += 1
                search(
                    neighbor,
                    next_time,
                    quality + (values[neighbor] if first_visit else 0),
                )
                visits[neighbor] -= 1

        search(0, 0, values[0])
        return best
