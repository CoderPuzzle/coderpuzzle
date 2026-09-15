from typing import List, Optional
import heapq


class Solution:
    def maxEvents(self, events: List[List[int]]) -> int:
        # Day sweep over events sorted by start day; a min-heap of end days
        # holds the events available today.
        events = sorted(events)
        n = len(events)
        i = 0
        day = 1
        open_ends = []
        attended = 0
        while i < n or open_ends:
            # Heap empty: skip idle days by jumping the clock straight to
            # the next event's start day.
            if not open_ends:
                day = max(day, events[i][0])
            # Every event that has started becomes available today.
            while i < n and events[i][0] <= day:
                heapq.heappush(open_ends, events[i][1])
                i += 1
            # Discard events whose end day already passed — lost regardless.
            while open_ends and open_ends[0] < day:
                heapq.heappop(open_ends)
            # Attend the soonest-ending (most perishable) event; an exchange
            # argument shows swapping it in never breaks feasibility.
            if open_ends:
                heapq.heappop(open_ends)
                attended += 1
            day += 1
        return attended
