from typing import List


class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        # Greedy left-to-right scan: plant any empty plot whose previous
        # and next plots are both empty, reading a missing neighbor at
        # either end as empty. A plant never blocks more than it enables,
        # so the running count is the bed's true capacity.
        count = 0
        prev = 0
        size = len(flowerbed)
        for i in range(size):
            nxt = flowerbed[i + 1] if i + 1 < size else 0
            if flowerbed[i] == 0 and prev == 0 and nxt == 0:
                count += 1
                prev = 1
            else:
                # prev carries the previous plot's effective value: 1 when a
                # flower was just planted there, otherwise the plot as read.
                prev = flowerbed[i]
        return count >= n
