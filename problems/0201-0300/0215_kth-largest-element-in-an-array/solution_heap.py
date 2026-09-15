from typing import List, Optional

import heapq


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # A min-heap of size k holds the k largest values seen so far;
        # its root is the smallest of them — the current kth largest.
        heap = nums[:k]
        heapq.heapify(heap)
        for x in nums[k:]:
            # Peek first: only values strictly greater than the root
            # earn a pop-and-push, keeping the pass O(n log k).
            if x > heap[0]:
                heapq.heapreplace(heap, x)
        # When the scan ends the root is the smallest of the top k —
        # the kth largest by rank, duplicates counted.
        return heap[0]
