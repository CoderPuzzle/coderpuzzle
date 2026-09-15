import heapq
from typing import List, Optional


class Solution:
    def minRefuelStops(self, target: int, startFuel: int, stations: List[List[int]]) -> int:
        # Greedy: drive as far as possible; when short of the target,
        # retroactively refuel with the largest fuel among stations passed.
        fuel = startFuel
        available = []  # max-heap (negated) of fuels at stations already passed
        stops = 0
        i = 0
        n = len(stations)
        while True:
            if fuel >= target:
                return stops
            farthest = fuel
            while i < n and stations[i][0] <= farthest:
                heapq.heappush(available, -stations[i][1])
                i += 1
            if not available:
                return -1
            fuel += -heapq.heappop(available)
            stops += 1
