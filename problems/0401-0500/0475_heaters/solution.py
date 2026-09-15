from bisect import bisect_left
from typing import List


class Solution:
    def findRadius(self, houses: List[int], heaters: List[int]) -> int:
        # Only the heaters need order: each house binds to its nearest one.
        heaters.sort()
        radius = 0
        for house in houses:
            # bisect_left lands on the first heater at or right of the house,
            # so the nearest heater is it, or the one just before.
            index = bisect_left(heaters, house)
            if index == 0:
                nearest = heaters[0] - house
            elif index == len(heaters):
                nearest = house - heaters[-1]
            else:
                nearest = min(house - heaters[index - 1], heaters[index] - house)
            radius = max(radius, nearest)
        return radius
