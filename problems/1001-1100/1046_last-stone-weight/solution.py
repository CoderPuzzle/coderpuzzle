from typing import List, Optional

import heapq


class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        # heapq is a min-heap, so store negated weights: smallest negated
        # value = heaviest stone.
        heap = [-s for s in stones]
        heapq.heapify(heap)
        while len(heap) > 1:
            # The two heaviest stones; equal ones annihilate (nothing pushed).
            y = -heapq.heappop(heap)
            x = -heapq.heappop(heap)
            if x != y:
                heapq.heappush(heap, -(y - x))
        # Empty heap means every stone paired off into equal smashings.
        return -heap[0] if heap else 0
