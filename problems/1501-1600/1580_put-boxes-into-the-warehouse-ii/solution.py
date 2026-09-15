from typing import List, Optional


class Solution:
    def maxBoxesInWarehouse(self, boxes: List[int], warehouse: List[int]) -> int:
        # A box can enter from either side, so room i only has to survive
        # whichever path is more forgiving: the prefix minimum coming from
        # the left, or the suffix minimum coming from the right.
        n = len(warehouse)
        prefix_min = [0] * n
        running = warehouse[0]
        for i in range(n):
            running = min(running, warehouse[i])
            prefix_min[i] = running

        suffix_min = [0] * n
        running = warehouse[-1]
        for i in range(n - 1, -1, -1):
            running = min(running, warehouse[i])
            suffix_min[i] = running

        effective = [max(prefix_min[i], suffix_min[i]) for i in range(n)]

        # effective is no longer monotonic, so sort both sides and sweep
        # with two pointers: the smallest remaining box is the best fit
        # for the smallest remaining room capacity.
        effective.sort()
        boxes.sort()
        placed = 0
        j = 0
        for e in effective:
            if j >= len(boxes):
                break
            if boxes[j] <= e:
                placed += 1
                j += 1
        return placed
