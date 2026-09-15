import heapq
from math import isqrt
from typing import List


class Solution:
    def pickGifts(self, gifts: List[int], k: int) -> int:
        # Live-maximum simulation: each second the richest pile shrinks
        # to floor(sqrt(value)), which only ever lowers it, so a max-heap
        # replaying exactly k rounds mirrors the process with ties
        # changing nothing — any pick order yields the same multiset.
        # The answer is bounded by 10^3 piles * 10^9 gifts = 10^12, past
        # 32-bit range but exact as a 64-bit integer.
        heap = [-v for v in gifts]
        heapq.heapify(heap)
        for _ in range(k):
            value = -heapq.heappop(heap)
            heapq.heappush(heap, -isqrt(value))
        return sum(-v for v in heap)
