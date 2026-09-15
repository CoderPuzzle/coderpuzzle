from typing import List


class Solution:
    def minimumCost(self, m: int, n: int, horizontalCut: List[int], verticalCut: List[int]) -> int:
        # A cut costs its base price times the pieces it crosses: one more
        # for every opposite-direction cut already made. An exchange argument
        # (swapping adjacent opposite cuts never helps unless the pricier one
        # goes first) makes "expensive cuts early" the optimal schedule.
        hcuts = sorted(horizontalCut, reverse=True)
        vcuts = sorted(verticalCut, reverse=True)
        i = j = 0
        h_made = v_made = 0
        total = 0
        # Two-pointer merge: always take the head with the larger base cost,
        # while its multiplier (opposite cuts made + 1) is still small.
        while i < len(hcuts) and j < len(vcuts):
            # Ties (>=) may go to the horizontal head: equal base costs are
            # interchangeable in the exchange argument.
            if hcuts[i] >= vcuts[j]:
                total += hcuts[i] * (v_made + 1)
                i += 1
                h_made += 1
            else:
                total += vcuts[j] * (h_made + 1)
                j += 1
                v_made += 1
        # One direction is drained, so the other's multiplier is now fixed.
        while i < len(hcuts):
            total += hcuts[i] * (v_made + 1)
            i += 1
        while j < len(vcuts):
            total += vcuts[j] * (h_made + 1)
            j += 1
        return total
