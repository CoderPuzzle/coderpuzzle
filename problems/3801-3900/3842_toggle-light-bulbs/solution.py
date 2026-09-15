from typing import List


class Solution:
    def toggleLightBulbs(self, bulbs: List[int]) -> List[int]:
        # Toggle a fixed table indexed by bulb number; a bulb ends on exactly when
        # it is toggled an odd number of times. Sweep indices 1..100 and collect
        # the on positions — ascending order for free.
        on = [False] * 101
        for value in bulbs:
            on[value] = not on[value]
        return [i for i in range(1, 101) if on[i]]
