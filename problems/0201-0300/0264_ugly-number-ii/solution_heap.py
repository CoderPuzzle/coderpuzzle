from typing import List, Optional

import heapq


class Solution:
    def nthUglyNumber(self, n: int) -> int:
        # Frontier of the generation process: a min-heap seeded with 1, so
        # the smallest not-yet-emitted ugly number is always at its top.
        heap = [1]
        # The heap is a frontier, not a set: pushing every successor would
        # enqueue duplicates (6 = 2·3 = 3·2), so seen gates each push.
        seen = {1}
        for _ in range(n - 1):
            value = heapq.heappop(heap)
            for factor in (2, 3, 5):
                multiple = value * factor
                if multiple not in seen:
                    seen.add(multiple)
                    heapq.heappush(heap, multiple)
        # After n-1 pops the heap top is the n-th ugly number in order.
        return heap[0]
