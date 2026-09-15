from typing import List, Optional


class Solution:
    def minimumCosts(self, regular: List[int], express: List[int], expressCost: int) -> List[int]:
        # Track the cheapest cost to reach the previous stop on each route;
        # at stop 0 only the regular seat exists, so exp starts unreachable.
        # Dropping express -> regular is free; boarding regular -> express
        # costs expressCost every time. Totals reach ~2e10, so fixed-width
        # languages must carry these values in 64 bits.
        inf = float("inf")
        reg, exp = 0, inf
        costs = []
        for i in range(len(regular)):
            reg, exp = (
                min(reg, exp) + regular[i],
                min(reg + expressCost, exp) + express[i],
            )
            costs.append(min(reg, exp))
        return costs
