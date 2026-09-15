from typing import List, Optional

import heapq


class Solution:
    def getOrder(self, tasks: List[List[int]]) -> List[int]:
        n = len(tasks)
        # Indices pre-sorted by (enqueueTime, index): the arrival stream only moves forward.
        by_enqueue = sorted(range(n), key=lambda i: (tasks[i][0], i))
        heap = []  # min-heap of (processingTime, index) — the CPU's selection rule
        order = []
        time = 0
        i = 0
        while i < n or heap:
            if not heap:
                # CPU idle: jump straight to the next arrival instead of ticking.
                time = max(time, tasks[by_enqueue[i]][0])
            # Enqueue everything available at this instant BEFORE popping, so all
            # contenders compete under the same (processingTime, index) order.
            while i < n and tasks[by_enqueue[i]][0] <= time:
                j = by_enqueue[i]
                heapq.heappush(heap, (tasks[j][1], j))
                i += 1
            proc, j = heapq.heappop(heap)
            order.append(j)  # winner: shortest processing time, smallest index on ties
            time += proc  # clock advances by exactly the winner's duration
        return order
