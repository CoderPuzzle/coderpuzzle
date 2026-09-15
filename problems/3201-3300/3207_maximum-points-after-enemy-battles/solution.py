from typing import List


class Solution:
    def maximumPoints(self, enemyEnergies: List[int], currentEnergy: int) -> int:
        # Keep the smallest enemy unmarked as a recharge battery; its value m
        # is the cheapest point source and the worst enemy to give up, since
        # every marked enemy's energy only ever feeds farming in lots of m.
        # If the initial energy cannot already beat even m, no first point is
        # possible (marking needs one). Otherwise all remaining enemies get
        # marked eventually and each lot of m converts to a point, so the
        # answer is the initial energy plus every other enemy's energy,
        # divided by m. The sum stays below 10^5 * 10^9 + 10^9 < 2^47.
        smallest = min(enemyEnergies)
        if currentEnergy < smallest:
            return 0
        return (currentEnergy + sum(enemyEnergies) - smallest) // smallest
