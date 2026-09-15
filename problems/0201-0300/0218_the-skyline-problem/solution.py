from typing import List, Optional

import heapq


class Solution:
    def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
        events = []
        for left, right, height in buildings:
            # Tuple sorting encodes the tie-breaking: starts (kind 0) before
            # ends (kind 1) at equal x so adjacent buildings hand off without
            # a dip to ground; taller starts first (-height); shorter ends
            # first so a tall building survives until its own right edge.
            events.append((left, 0, -height, right))  # start
            events.append((right, 1, height, right))  # end
        events.sort()

        result = []
        # Ground sentinel (0, inf): the top is always defined even when no
        # building covers the sweep point.
        heap = [(0, float("inf"))]  # (-height, right); top is tallest active
        previous_height = 0
        for x, kind, height, right in events:
            # Lazy removal: pop top entries whose building has ended; stale
            # entries below the top are harmless until they surface.
            while heap and heap[0][1] <= x:
                heapq.heappop(heap)
            if kind == 0:
                heapq.heappush(heap, (height, right))
            current_height = -heap[0][0]
            # Emit a key point only when the contour height actually changes,
            # which also merges consecutive equal-height segments.
            if current_height != previous_height:
                result.append([x, current_height])
                previous_height = current_height
        return result
