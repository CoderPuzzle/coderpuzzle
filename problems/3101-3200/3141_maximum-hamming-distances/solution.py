from collections import deque
from typing import List


class Solution:
    def maxHammingDistances(self, nums: List[int], m: int) -> List[int]:
        # HD(x, y) + HD(~x, y) = m, so max distance from x = m - minDist(~x).
        size = 1 << m
        full = size - 1
        dist = [size + 1] * size
        queue = deque()
        # Seed every distinct array value as a BFS source at distance 0.
        for value in set(nums):
            dist[value] = 0
            queue.append(value)
        # One bit flip = one Hamming step; unit edges make first reach shortest.
        while queue:
            v = queue.popleft()
            nd = dist[v] + 1
            for bit in range(m):
                u = v ^ (1 << bit)
                if dist[u] > nd:
                    dist[u] = nd
                    queue.append(u)
        # The complement's closest element is x's farthest.
        return [m - dist[full ^ x] for x in nums]
