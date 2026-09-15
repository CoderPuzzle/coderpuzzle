from typing import List


class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        merged: List[List[int]] = []
        n = len(intervals)
        # The new interval is widened in start/end locals so the caller's
        # newInterval is never mutated while it is being absorbed.
        start, end = newInterval
        i = 0
        # Phase 1 — an interval ending strictly before the new one starts
        # shares no point with it, so every such interval passes through
        # untouched and in order.
        while i < n and intervals[i][1] < start:
            merged.append(intervals[i])
            i += 1
        # Phase 2 — an interval starting at or before the new end shares at
        # least one point, so it is absorbed by widening [start, end] to
        # cover it. The absorbed intervals are contiguous because the input
        # is sorted by start, so one widening run merges everything.
        while i < n and intervals[i][0] <= end:
            start = min(start, intervals[i][0])
            end = max(end, intervals[i][1])
            i += 1
        merged.append([start, end])
        # Phase 3 — whatever is left starts strictly after the new end, so
        # it shares no point with the merged interval either and passes
        # through untouched.
        while i < n:
            merged.append(intervals[i])
            i += 1
        return merged
