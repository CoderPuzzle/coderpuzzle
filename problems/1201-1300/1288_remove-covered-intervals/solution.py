from typing import List


class Solution:
    def removeCoveredIntervals(self, intervals: List[List[int]]) -> int:
        # Sort by start ascending, end DESCENDING: then any interval whose
        # end is not beyond the best end seen so far must sit inside some
        # earlier interval (equal starts sort the wider one first, so the
        # narrower twin is correctly counted as covered).
        intervals.sort(key=lambda iv: (iv[0], -iv[1]))
        remaining = 0
        best_end = 0
        for _, end in intervals:
            if end > best_end:
                remaining += 1
                best_end = end
        return remaining
