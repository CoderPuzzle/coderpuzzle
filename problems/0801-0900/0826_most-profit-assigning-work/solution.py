from bisect import bisect_right
from typing import List


class Solution:
    def maxProfitAssignment(self, difficulty: List[int], profit: List[int], worker: List[int]) -> int:
        # Workers never compete: jobs are reusable, so each worker simply
        # earns the maximum profit among the jobs whose difficulty is at
        # most their ability. Sort the jobs by difficulty, carry the running
        # profit maximum, and read every worker's earning off a binary
        # search into the sorted difficulties.
        jobs = sorted(zip(difficulty, profit))
        hardest = [d for d, _ in jobs]
        best = []
        top = 0
        for _, p in jobs:
            top = max(top, p)
            best.append(top)
        total = 0
        for ability in worker:
            index = bisect_right(hardest, ability) - 1
            if index >= 0:
                total += best[index]
        return total
