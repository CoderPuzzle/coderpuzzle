from typing import List, Optional


class Solution:
    def maxBoxesInWarehouse(self, boxes: List[int], warehouse: List[int]) -> int:
        # A box entering from room 0 can only ever reach room i if every
        # room 0..i also let it through, so the height that actually
        # matters at position i is the prefix minimum of warehouse[0..i].
        n = len(warehouse)
        effective = [0] * n
        running_min = warehouse[0]
        for i in range(n):
            running_min = min(running_min, warehouse[i])
            effective[i] = running_min

        # effective is non-increasing outward-to-inward, so read it from the
        # back (deepest room, smallest allowance) forward. Match it against
        # boxes sorted ascending: the smallest remaining box is the best fit
        # for the tightest remaining room.
        boxes.sort()
        placed = 0
        j = 0
        for i in range(n - 1, -1, -1):
            if j >= len(boxes):
                break
            if boxes[j] <= effective[i]:
                placed += 1
                j += 1
        return placed
