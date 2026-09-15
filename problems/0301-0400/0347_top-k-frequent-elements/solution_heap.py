from typing import List, Optional

import heapq


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # One counting pass over the array.
        counts = {}
        for x in nums:
            counts[x] = counts.get(x, 0) + 1
        # Size-k min-heap keyed (count, -value): the root is the weakest
        # keeper — smallest count, and among equal counts the largest
        # value — so eviction order mirrors the final ranking.
        heap = []
        for value, count in counts.items():
            entry = (count, -value)
            if len(heap) < k:
                heapq.heappush(heap, entry)
            elif entry > heap[0]:
                # Replace the root only when the newcomer outranks it:
                # higher count, or equal count and smaller value.
                heapq.heapreplace(heap, entry)
        # Survivors are exactly the top k by (higher count, then smaller
        # value); emit them in that order.
        heap.sort(key=lambda entry: (-entry[0], entry[1]))
        return [-entry[1] for entry in heap]
