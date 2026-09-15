from typing import List, Optional


class Solution:
    def minTaps(self, n: int, ranges: List[int]) -> int:
        # Each tap becomes the interval [i-r, i+r] clamped to [0, n]; the task
        # is the classic minimum-interval-cover of the garden segment.
        # Sorting by left endpoint makes the sweep a single pass.
        intervals = sorted((max(0, i - r), min(n, i + r)) for i, r in enumerate(ranges))
        count = 0
        covered = 0
        i = 0
        total = len(intervals)
        while covered < n:
            # Among all intervals that start at or before the watered prefix,
            # take the farthest reach — the jump-game argument: any solution
            # must cross the current boundary, and the farthest reach leaves
            # the most room for the remaining cover.
            reach = covered
            while i < total and intervals[i][0] <= covered:
                reach = max(reach, intervals[i][1])
                # Once an interval's start exceeds `covered` it exceeds every
                # earlier value too, so i is never revisited.
                i += 1
            if reach == covered:
                # No interval connects to the watered prefix: unwatered gap.
                return -1
            covered = reach
            count += 1
        return count
