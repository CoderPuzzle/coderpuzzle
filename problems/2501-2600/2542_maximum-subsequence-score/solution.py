from typing import List, Optional
import heapq


class Solution:
    def maxScore(self, nums1: List[int], nums2: List[int], k: int) -> int:
        # Enumerate which element provides the min(nums2): sweeping pairs in
        # descending nums2 order means everything already seen has nums2 >= b,
        # so b is the minimum of any set drawn from pairs seen so far.
        pairs = sorted(zip(nums2, nums1), reverse=True)
        heap = []
        total = 0
        best = 0
        for b, a in pairs:
            heapq.heappush(heap, a)
            total += a
            # Min-heap of size k with a running sum holds the k largest nums1
            # seen so far; ejecting the smallest keeps the top-k sum correct.
            if len(heap) > k:
                total -= heapq.heappop(heap)
            # With k companions available, total * b is the best score under
            # the assumption that b is the minimum; take the max over the
            # sweep. Ties in nums2 are safe: the last of them still sees all
            # the others in the heap.
            if len(heap) == k:
                best = max(best, total * b)
        return best
