from typing import List, Optional

import heapq


class Solution:
    def maxPerformance(self, n: int, speed: List[int], efficiency: List[int], k: int) -> int:
        MOD = 10**9 + 7
        # Decouple sum(speeds) * min(efficiency) by fixing the minimum:
        # sweep in decreasing efficiency so the current engineer caps the
        # team, and everyone seen so far has efficiency >= theirs.
        engineers = sorted(zip(efficiency, speed), reverse=True)
        heap = []
        speed_sum = 0
        best = 0
        for eff, spd in engineers:
            heapq.heappush(heap, spd)
            speed_sum += spd
            # Evict the slowest when over budget, leaving the k fastest
            # among engineers with efficiency >= the current one.
            if len(heap) > k:
                speed_sum -= heapq.heappop(heap)
            # Best performance of any team this engineer caps; the optimal
            # team's bottleneck appears as "current" at some step.
            best = max(best, speed_sum * eff)
        # Reduce only at the end: the max must be taken on true values.
        return best % MOD
