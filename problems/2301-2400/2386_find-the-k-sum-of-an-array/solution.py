from typing import List, Optional

import heapq


class Solution:
    def kSum(self, nums: List[int], k: int) -> int:
        # every subsequence sum = base - (subset sum of absolute values)
        base = sum(x for x in nums if x > 0)
        costs = sorted(abs(x) for x in nums)
        if k == 1:
            return base
        n = len(costs)
        heap = [(costs[0], 0)]
        count = 1  # empty subset (sum 0) is the 1st smallest
        while count < k:
            cur, idx = heapq.heappop(heap)
            count += 1
            if count == k:
                return base - cur
            if idx + 1 < n:
                heapq.heappush(heap, (cur - costs[idx] + costs[idx + 1], idx + 1))
                heapq.heappush(heap, (cur + costs[idx + 1], idx + 1))
        return base
