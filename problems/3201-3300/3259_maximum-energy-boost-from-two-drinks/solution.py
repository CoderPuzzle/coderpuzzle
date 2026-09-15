from typing import List


class Solution:
    def maxEnergyBoost(self, energyDrinkA: List[int], energyDrinkB: List[int]) -> int:
        # A plan that drinks A at hour i either drank A at hour i-1 or
        # drank B at hour i-2 and idled through the cleanse hour i-1, so
        # dpA[i] = max(dpA[i-1], dpB[i-2]) + energyDrinkA[i] and
        # symmetrically for B. Four rolling variables carry the current
        # pair and the one-hour-older pair.
        a = energyDrinkA[0] + energyDrinkA[1]
        b = energyDrinkB[0] + energyDrinkB[1]
        old_a, old_b = energyDrinkA[0], energyDrinkB[0]
        for i in range(2, len(energyDrinkA)):
            a, b, old_a, old_b = (
                max(a, old_b) + energyDrinkA[i],
                max(b, old_a) + energyDrinkB[i],
                a,
                b,
            )
        return max(a, b)
