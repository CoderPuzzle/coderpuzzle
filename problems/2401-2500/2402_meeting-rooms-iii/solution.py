from typing import List, Optional
import heapq


class Solution:
    def mostBooked(self, n: int, meetings: List[List[int]]) -> int:
        # Process meetings by start time.
        ordered = sorted(meetings, key=lambda m: m[0])
        # free holds unused room numbers (min-heap: lowest room pops first);
        # busy holds (end_time, room) so the earliest-freeing room pops first.
        free = list(range(n))
        heapq.heapify(free)
        busy = []  # (end_time, room)
        count = [0] * n
        for s, e in ordered:
            # Release every room done by s BEFORE allocating, so the
            # lowest-numbered simultaneously-free room wins.
            while busy and busy[0][0] <= s:
                _, room = heapq.heappop(busy)
                heapq.heappush(free, room)
            if free:
                room = heapq.heappop(free)
                heapq.heappush(busy, (e, room))
            else:
                # Delayed meeting: take the earliest-finishing room and keep
                # the same duration, so the new end is old end + (e - s).
                end, room = heapq.heappop(busy)
                heapq.heappush(busy, (end + (e - s), room))
            count[room] += 1
        # Strict comparison keeps the lowest room index on count ties.
        best = 0
        for i in range(1, n):
            if count[i] > count[best]:
                best = i
        return best
