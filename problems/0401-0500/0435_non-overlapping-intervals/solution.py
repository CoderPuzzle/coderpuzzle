from typing import List, Optional


class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        removed = 0
        # None (not 0) marks "nothing kept yet" since endpoints may be <= 0.
        prev_end = None
        # Minimizing removals = maximizing kept non-overlapping intervals, so
        # sweep by earliest end: keeping the earliest-ending candidate leaves
        # the most room for everything after it.
        for start, end in sorted(intervals, key=lambda x: x[1]):
            # Touching endpoints do not overlap, so start == prev_end keeps.
            if prev_end is None or start >= prev_end:
                prev_end = end
            else:
                # Discarded: it intersects the last kept (earliest-ending)
                # interval, so one removal per conflict is exactly optimal.
                removed += 1
        return removed
