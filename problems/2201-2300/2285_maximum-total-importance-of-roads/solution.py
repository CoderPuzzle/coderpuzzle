from typing import List


class Solution:
    def maximumImportance(self, n: int, roads: List[List[int]]) -> int:
        degrees = [0] * n
        for a, b in roads:
            degrees[a] += 1
            degrees[b] += 1
        degrees.sort()
        return sum((rank + 1) * degree for rank, degree in enumerate(degrees))
