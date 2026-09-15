import heapq
from typing import List


class Solution:
    def maxSum(self, nums: List[int], threshold: List[int]) -> int:
        # An element unlocks when step reaches its threshold and stays
        # usable forever after. Bucket indices by unlock step; everything
        # at threshold 1 starts in the max-heap of usable values.
        n = len(nums)
        waiting = [[] for _ in range(n + 1)]
        live = [(-nums[i], i) for i in range(n) if threshold[i] <= 1]
        heapq.heapify(live)
        for i in range(n):
            if threshold[i] > 1:
                waiting[threshold[i]].append(i)
        total = 0
        step = 1
        while True:
            # Fold in this step's unlocks, then stop if nothing is usable.
            if step <= n:
                for i in waiting[step]:
                    heapq.heappush(live, (-nums[i], i))
            if not live:
                break
            neg_v, _ = heapq.heappop(live)
            total += -neg_v
            step += 1
        return total
