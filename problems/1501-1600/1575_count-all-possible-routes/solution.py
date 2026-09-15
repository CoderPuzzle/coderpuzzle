from functools import lru_cache
from typing import List

MOD = 10**9 + 7


class Solution:
    def countRoutes(self, locations: List[int], start: int, finish: int, fuel: int) -> int:
        n = len(locations)

        @lru_cache(maxsize=None)
        def routes_from(city: int, remaining: int) -> int:
            # A route may stop here (only valid when this city is the
            # destination) or continue on to any other city that still
            # leaves non-negative fuel; both possibilities are counted.
            total = 1 if city == finish else 0
            for neighbor in range(n):
                if neighbor == city:
                    continue
                cost = abs(locations[city] - locations[neighbor])
                if cost <= remaining:
                    total += routes_from(neighbor, remaining - cost)
            return total % MOD

        return routes_from(start, fuel)
