from typing import List, Optional

import heapq


class Solution:
    def makePrefSumNonNegative(self, nums: List[int]) -> int:
        heap = []
        prefix = 0
        ops = 0
        for num in nums:
            prefix += num
            # Every element seen so far is a deferral candidate; a negative is
            # handled not when read but at the first prefix it poisons.
            heapq.heappush(heap, num)
            # Prefix dipped below zero: defer the smallest element seen so far
            # to the end. Removing the minimum raises the prefix the most, so
            # by an exchange argument this uses the fewest operations.
            while prefix < 0:
                prefix -= heapq.heappop(heap)
                ops += 1
        return ops
