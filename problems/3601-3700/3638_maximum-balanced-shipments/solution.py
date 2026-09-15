from typing import List


class Solution:
    def maxBalancedShipments(self, weight: List[int]) -> int:
        # A run is balanced exactly where its last parcel is strictly
        # lighter than the run's heaviest parcel, so one sweep tracks the
        # open segment's maximum and closes on the first dip.
        shipments = 0
        segment_max = 0
        for w in weight:
            if w < segment_max:
                # Closing here is never worse than waiting: delaying the
                # reset only shrinks what later segments could use.
                shipments += 1
                segment_max = 0
            elif w > segment_max:
                segment_max = w
        return shipments
