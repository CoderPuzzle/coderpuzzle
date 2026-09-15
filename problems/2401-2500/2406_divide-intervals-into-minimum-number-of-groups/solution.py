from typing import List, Optional


class Solution:
    def minGroups(self, intervals: List[List[int]]) -> int:
        # Answer = peak coverage depth: intervals sharing a point pairwise
        # intersect, so they need distinct groups, and peak depth suffices.
        starts = sorted(interval[0] for interval in intervals)
        ends = sorted(interval[1] for interval in intervals)
        groups = 0
        active = 0
        i = j = 0
        n = len(starts)
        # Only openings can create depth, so stop once starts are used up.
        while i < n:
            # '<=' keeps touching intervals ([1,5],[5,8]) overlapping —
            # the opening at ends[j] is processed before that close.
            if starts[i] <= ends[j]:
                active += 1
                if active > groups:
                    groups = active
                i += 1
            else:
                active -= 1
                j += 1
        return groups
