from typing import List

import heapq


class MedianFinder:
    """Two heaps around the median: a max-heap (via negation) holding the
    smaller half and a min-heap holding the larger half.

    The halves are kept within one element of each other, so the median is
    either the max-heap's top (odd count) or the average of both tops.
    """

    def __init__(self) -> None:
        self.low: List[int] = []  # smaller half, max-heap via negation
        self.high: List[int] = []  # larger half, min-heap

    def addNum(self, num: int) -> None:  # noqa: N802 — LeetCode API
        heapq.heappush(self.low, -num)
        # Route through both heaps: the largest of the small half crosses
        # over, then rebalance if the large half grew too big.
        heapq.heappush(self.high, -heapq.heappop(self.low))
        if len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def findMedian(self) -> float:  # noqa: N802 — LeetCode API
        if len(self.low) > len(self.high):
            return float(-self.low[0])
        return (-self.low[0] + self.high[0]) / 2
