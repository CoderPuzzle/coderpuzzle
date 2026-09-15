from typing import List, Optional
import heapq


class Solution:
    def minStoneSum(self, piles: List[int], k: int) -> int:
        # Max-heap via negated values. The removal floor(p/2) is
        # non-decreasing in p, so always halving the current max is optimal:
        # any operation on a smaller pile could be swapped to the larger one
        # without worsening the total.
        heap = [-p for p in piles]
        heapq.heapify(heap)
        for _ in range(k):
            top = -heap[0]
            if top == 1:
                break  # floor(1/2) removes nothing: remaining ops are no-ops
            # heapreplace fuses pop+push into one sift; keeps top - floor(top/2).
            heapq.heapreplace(heap, -(top - top // 2))
        return -sum(heap)
