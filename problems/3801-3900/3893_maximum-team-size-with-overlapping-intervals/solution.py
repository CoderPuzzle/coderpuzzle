from bisect import bisect_left, bisect_right
from typing import List, Optional


class Solution:
    def maximumTeamSize(self, startTime: List[int], endTime: List[int]) -> int:
        # A team is valid when one member overlaps everyone else, so the
        # largest team is the largest set of intervals all overlapping a single
        # interval. For each interval i, that set is exactly the intervals j
        # with startTime[j] <= endTime[i] and endTime[j] >= startTime[i].
        starts = sorted(startTime)
        ends = sorted(endTime)
        best = 0
        for start, end in zip(startTime, endTime):
            # Count starts no later than end minus ends earlier than start.
            # The second set is a subset of the first (an interval ending
            # before start also starts before it), so the difference is exactly
            # the overlapping intervals, including i itself.
            overlap = bisect_right(starts, end) - bisect_left(ends, start)
            if overlap > best:
                best = overlap
        return best
