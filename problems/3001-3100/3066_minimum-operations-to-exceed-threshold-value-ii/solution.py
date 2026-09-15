from typing import List, Optional

import heapq


class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        h = list(nums)
        heapq.heapify(h)
        operations = 0
        # Each operation must consume the two smallest values, so the process
        # is fully deterministic once the array sits in a min-heap.
        # Done when the minimum reaches k (then every element has) or fewer
        # than two elements remain.
        while len(h) >= 2 and h[0] < k:
            x = heapq.heappop(h)
            y = heapq.heappop(h)
            # x is the smaller pop by heap order, so this is min*2 + max.
            heapq.heappush(h, x * 2 + y)
            operations += 1
        return operations
