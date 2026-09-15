from bisect import bisect_left
from typing import List


class SummaryRanges:
    """Sorted list of disjoint [start, end] intervals, merged at add time.

    `addNum` binary-searches the starts for the value's slot, then repairs
    at most the two neighboring intervals; `getIntervals` hands out a copy.
    """

    def __init__(self) -> None:
        self.intervals: List[List[int]] = []

    def addNum(self, value: int) -> None:
        # [value] sorts just before [value, end], so this lands on the
        # first interval whose start is >= value.
        index = bisect_left(self.intervals, [value])
        touches_left = index > 0 and self.intervals[index - 1][1] + 1 >= value
        touches_right = index < len(self.intervals) and self.intervals[index][0] - 1 <= value
        if touches_left and touches_right:
            # value welds the two neighbors into one interval.
            self.intervals[index - 1][1] = self.intervals[index][1]
            del self.intervals[index]
        elif touches_left:
            # Extend the left neighbor; a value it already covers is a no-op.
            self.intervals[index - 1][1] = max(self.intervals[index - 1][1], value)
        elif touches_right:
            self.intervals[index][0] = value
        else:
            self.intervals.insert(index, [value, value])

    def getIntervals(self) -> List[List[int]]:
        return [list(interval) for interval in self.intervals]
