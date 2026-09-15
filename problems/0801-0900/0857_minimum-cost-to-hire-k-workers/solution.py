import heapq
from typing import List, Optional


class Solution:
    def mincostToHireWorkers(self, quality: List[int], wage: List[int], k: int) -> float:
        # Sort workers by wage/quality ratio. For each worker as the one paid
        # exactly their minimum wage (the highest ratio in the chosen group),
        # the best group is the k-1 others with smallest quality among cheaper
        # ratios. Maintain a max-heap of chosen qualities.
        workers = sorted(zip(wage, quality), key=lambda w: w[0] / w[1])
        best = float("inf")
        heap = []  # max-heap via negation: qualities of the current candidate group
        total_quality = 0
        for w, q in workers:
            heapq.heappush(heap, -q)
            total_quality += q
            if len(heap) > k:
                total_quality += heapq.heappop(heap)  # removes -(max quality)
            if len(heap) == k:
                best = min(best, total_quality * (w / q))
        return best
