from typing import List, Optional
import heapq


class Solution:
    def connectSticks(self, sticks: List[int]) -> int:
        if len(sticks) <= 1:
            # a single stick needs no merge
            return 0
        heap = list(sticks)
        heapq.heapify(heap)
        total = 0
        # Huffman-style exchange argument: a length is paid once per merge
        # above it, so always merging the two shortest is optimal
        while len(heap) > 1:
            combined = heapq.heappop(heap) + heapq.heappop(heap)
            total += combined
            # the combined stick re-enters the pool for later merges
            heapq.heappush(heap, combined)
        return total
