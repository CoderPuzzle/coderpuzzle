import heapq
from typing import List


class Solution:
    def maximumScore(self, nums: List[int], s: str) -> int:
        # Sweep left to right pushing every value as a candidate final
        # slot; the '1' met at index i claims the best slot offered so
        # far, so a max-heap pop is its contribution. Negated values turn
        # heapq's min-heap into a max-heap.
        heap = []
        answer = 0
        for i, value in enumerate(nums):
            heapq.heappush(heap, -value)
            if s[i] == "1":
                answer -= heapq.heappop(heap)
        return answer
