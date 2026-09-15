import heapq
from typing import List, Optional


class Solution:
    def totalCost(self, costs: List[int], k: int, candidates: int) -> int:
        n = len(costs)
        # Windows overlap => every remaining worker is always eligible,
        # so the greedy is just "hire the k cheapest overall".
        if 2 * candidates >= n:
            return sum(sorted(costs)[:k])
        # (cost, index) tuples: heap order breaks cost ties by smaller index.
        left = [(costs[i], i) for i in range(candidates)]
        right = [(costs[i], i) for i in range(n - candidates, n)]
        heapq.heapify(left)
        heapq.heapify(right)
        # i feeds left and j feeds right from the untouched middle; i <= j
        # guards against inserting a middle worker twice.
        i, j = candidates, n - candidates - 1
        total = 0
        for _ in range(k):
            # Cheaper top wins; '<=' prefers left on ties.
            if not right or (left and left[0] <= right[0]):
                cost, _idx = heapq.heappop(left)
                if i <= j:
                    heapq.heappush(left, (costs[i], i))
                    i += 1
            else:
                cost, _idx = heapq.heappop(right)
                if i <= j:
                    heapq.heappush(right, (costs[j], j))
                    j -= 1
            total += cost
        return total
