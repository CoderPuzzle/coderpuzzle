from typing import List


class Solution:
    def maximumUnits(self, boxTypes: List[List[int]], truckSize: int) -> int:
        # Every box spends one truck slot regardless of type, so each slot
        # should hold the richest box still available: sort by units per box
        # descending and fill the truck front-to-back.
        boxTypes.sort(key=lambda box: box[1], reverse=True)
        units_total = 0
        remaining = truckSize
        for count, units in boxTypes:
            if remaining == 0:
                break
            take = min(count, remaining)
            units_total += take * units
            remaining -= take
        return units_total
