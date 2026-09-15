from typing import List


class Solution:
    def mostSimilar(self, n: int, roads: List[List[int]], names: List[str], targetPath: List[str]) -> List[int]:
        adjacency: List[List[int]] = [[] for _ in range(n)]
        for a, b in roads:
            adjacency[a].append(b)
            adjacency[b].append(a)

        path_length = len(targetPath)
        dp = [[0] * n for _ in range(path_length)]
        parent = [[-1] * n for _ in range(path_length)]
        for city in range(n):
            dp[0][city] = 0 if names[city] == targetPath[0] else 1

        for i in range(1, path_length):
            mismatch_cost = [0 if names[city] == targetPath[i] else 1 for city in range(n)]
            for city in range(n):
                best_parent = -1
                best_cost = -1
                for neighbor in adjacency[city]:
                    candidate = dp[i - 1][neighbor]
                    if best_parent == -1 or candidate < best_cost:
                        best_cost = candidate
                        best_parent = neighbor
                dp[i][city] = best_cost + mismatch_cost[city]
                parent[i][city] = best_parent

        end_city = min(range(n), key=lambda city: dp[path_length - 1][city])
        path = [0] * path_length
        city = end_city
        for i in range(path_length - 1, -1, -1):
            path[i] = city
            city = parent[i][city]
        return path
