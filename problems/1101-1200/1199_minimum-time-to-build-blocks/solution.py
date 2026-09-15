from typing import List, Optional
import heapq


class Solution:
    def minBuildTime(self, blocks: List[int], split: int) -> int:
        heap = list(blocks)
        heapq.heapify(heap)
        while len(heap) > 1:
            # Mount the two cheapest subtrees under one new split; heavier
            # work stays shallower, where the fan-out runs in parallel.
            first = heapq.heappop(heap)
            second = heapq.heappop(heap)
            heapq.heappush(heap, max(first, second) + split)
        return heap[0]
