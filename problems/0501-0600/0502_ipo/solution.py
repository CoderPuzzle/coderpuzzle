from typing import List, Optional

import heapq


class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        # Greedy: each round finish the affordable project with the largest
        # profit — finishing only adds capital, so the affordable set never
        # shrinks and no smaller-profit pick can unlock more later.
        projects = sorted(zip(capital, profits))
        n = len(projects)
        affordable = []  # max-heap of profits (negated)
        index = 0
        current = w
        # At most min(k, n) picks: only n distinct projects exist.
        for _ in range(min(k, n)):
            # Sweep every newly affordable project into the heap once; a
            # project affordable now stays affordable forever.
            while index < n and projects[index][0] <= current:
                heapq.heappush(affordable, -projects[index][1])
                index += 1
            # Heap empty: capital is too low to start anything left.
            if not affordable:
                break
            current += -heapq.heappop(affordable)
        return current
