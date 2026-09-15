from typing import List


class Solution:
    def maximumTotalSum(self, maximumHeight: List[int]) -> int:
        # Sorting descending makes the distinctness bound exact position by
        # position: once the previous tower took height prev, no later tower
        # may take anything above prev - 1, so each assigned height is
        # min(cap, prev - 1); falling below 1 means some prefix demands more
        # distinct positive integers than exist up to the largest cap, and
        # no rearrangement helps. Totals reach 10^14, which is why typed
        # languages widen to 64-bit.
        maximumHeight.sort(reverse=True)
        total = 0
        prev = None
        for cap in maximumHeight:
            height = cap if prev is None else min(cap, prev - 1)
            if height < 1:
                return -1
            total += height
            prev = height
        return total
