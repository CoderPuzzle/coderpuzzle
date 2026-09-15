from typing import List, Optional
import heapq


class Solution:
    def smallestRange(self, nums: List[List[int]]) -> List[int]:
        # Seed the heap with every list's head; the k-way merge sweeps candidate
        # ranges in order as the selection's minimum advances.
        heap = [(lst[0], i, 0) for i, lst in enumerate(nums)]
        heapq.heapify(heap)
        # Largest current head, tracked incrementally instead of re-scanning.
        cur_max = max(lst[0] for lst in nums)
        best_lo, best_hi = float("-inf"), float("inf")
        while True:
            lo, i, j = heapq.heappop(heap)
            # [lo, cur_max] covers all k lists: prefer smaller width, then
            # the smaller left endpoint on ties.
            if cur_max - lo < best_hi - best_lo or (cur_max - lo == best_hi - best_lo and lo < best_lo):
                best_lo, best_hi = lo, cur_max
            if j + 1 == len(nums[i]):
                # The popped list is exhausted: no later selection can still
                # include it, so every further candidate would be worse.
                return [best_lo, best_hi]
            nxt = nums[i][j + 1]
            if nxt > cur_max:
                cur_max = nxt
            heapq.heappush(heap, (nxt, i, j + 1))
