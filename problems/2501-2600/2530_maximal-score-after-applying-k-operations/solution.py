import heapq
from typing import List


class Solution:
    def maxKelements(self, nums: List[int], k: int) -> int:
        # Greedy on the live maximum: picking anything other than the
        # largest element both gains less now and leaves that giant intact,
        # so swapping the order never helps. A max-heap answers each
        # "largest element" query in O(log n) and takes the replaced
        # ceil(value / 3) straight back; score fits 64 bits at k*10^9.
        heap = [-v for v in nums]
        heapq.heapify(heap)
        score = 0
        for _ in range(k):
            value = -heapq.heappop(heap)
            score += value
            heapq.heappush(heap, -((value + 2) // 3))
        return score
