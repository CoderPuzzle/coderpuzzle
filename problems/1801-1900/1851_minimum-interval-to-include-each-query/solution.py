from typing import List, Optional

import heapq


class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        # Sweep queries in ascending order; intervals sorted by left end feed the sweep
        # through one forward-moving pointer, so each is pushed exactly once.
        intervals = sorted(intervals)
        order = sorted(range(len(queries)), key=lambda j: queries[j])
        heap = []
        answers = [0] * len(queries)
        i = 0
        n = len(intervals)
        for j in order:
            q = queries[j]
            # Intervals whose left end has been reached are now live (size, right).
            while i < n and intervals[i][0] <= q:
                left, right = intervals[i]
                heapq.heappush(heap, (right - left + 1, right))
                i += 1
            # Lazy deletion: the top dies past its right end, and since queries only
            # grow it fails every later query too — discarding it is permanent.
            while heap and heap[0][1] < q:
                heapq.heappop(heap)
            # Surviving top = smallest interval containing q.
            answers[j] = heap[0][0] if heap else -1
        return answers
