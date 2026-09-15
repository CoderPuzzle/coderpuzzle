from typing import List, Optional
import heapq


class Solution:
    def halveArray(self, nums: List[int]) -> int:
        total = sum(nums)
        # heapq is a min-heap, so negate values to simulate a max-heap
        heap = [-float(x) for x in nums]
        heapq.heapify(heap)
        # track the remaining reduction needed instead of re-summing each step
        target = total / 2.0
        ops = 0
        while target > 0:
            # greedy: halving the current maximum removes the most sum per op
            largest = -heapq.heappop(heap)
            half = largest / 2.0
            target -= half
            # push the half back: it may still be the max and get halved again
            heapq.heappush(heap, -half)
            ops += 1
        return ops
