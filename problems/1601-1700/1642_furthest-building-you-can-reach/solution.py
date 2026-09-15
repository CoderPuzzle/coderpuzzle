from typing import List, Optional
import heapq


class Solution:
    def furthestBuilding(self, heights: List[int], bricks: int, ladders: int) -> int:
        ladder_climbs = []  # min-heap of the climbs covered by ladders
        for i in range(len(heights) - 1):
            climb = heights[i + 1] - heights[i]
            if climb <= 0:
                continue
            heapq.heappush(ladder_climbs, climb)
            if len(ladder_climbs) > ladders:
                bricks -= heapq.heappop(ladder_climbs)
                if bricks < 0:
                    return i
        return len(heights) - 1
