import heapq
from typing import List


class Solution:
    def getStrongest(self, arr: List[int], k: int) -> List[int]:
        ordered = sorted(arr)
        m = ordered[(len(arr) - 1) // 2]
        # Size-k min-heap of might keys (distance, value, -index): the root
        # is the weakest keeper — shortest distance, then smallest value,
        # then latest index — so a later duplicate can never outrank an
        # earlier one.
        heap = []
        for i, v in enumerate(arr):
            entry = (abs(v - m), v, -i)
            if len(heap) < k:
                heapq.heappush(heap, entry)
            elif entry > heap[0]:
                # Replace the root only when the newcomer is strictly
                # mightier; a tie leaves the keepers alone.
                heapq.heapreplace(heap, entry)
        # The heap now holds the top k; emit them by original index.
        heap.sort(key=lambda item: -item[2])
        return [arr[-item[2]] for item in heap]
