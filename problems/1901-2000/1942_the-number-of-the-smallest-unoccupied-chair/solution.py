from typing import List, Optional
import heapq


class Solution:
    def smallestChair(self, times: List[List[int]], targetFriend: int) -> int:
        n = len(times)
        order = sorted(range(n), key=lambda i: times[i][0])
        occupied = []  # min-heap of (leaving_time, chair)
        free = []  # min-heap of free chair numbers
        next_chair = 0
        for i in order:
            arrival, leaving = times[i]
            while occupied and occupied[0][0] <= arrival:
                _, chair = heapq.heappop(occupied)
                heapq.heappush(free, chair)
            if free:
                chair = heapq.heappop(free)
            else:
                chair = next_chair
                next_chair += 1
            if i == targetFriend:
                return chair
            heapq.heappush(occupied, (leaving, chair))
        return -1
