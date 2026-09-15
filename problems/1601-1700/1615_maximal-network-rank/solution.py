from typing import List


class Solution:
    def maximalNetworkRank(self, n: int, roads: List[List[int]]) -> int:
        degree = [0] * n
        connected = set()
        for a, b in roads:
            degree[a] += 1
            degree[b] += 1
            connected.add((min(a, b), max(a, b)))

        best = 0
        for i in range(n):
            for j in range(i + 1, n):
                rank = degree[i] + degree[j]
                if (i, j) in connected:
                    rank -= 1
                if rank > best:
                    best = rank
        return best
