from typing import List


class Solution:
    def removeInterval(self, intervals: List[List[int]], toBeRemoved: List[int]) -> List[List[int]]:
        # Per interval, three outcomes: disjoint from the removal (keep
        # whole), straddling the left edge (keep head), or straddling the
        # right edge (keep tail); a full cover keeps nothing. An interval
        # can only ever be cut into two pieces, never more — the removal
        # is a single interval.
        remove_start, remove_end = toBeRemoved
        result = []
        for start, end in intervals:
            if start >= remove_end or end <= remove_start:
                result.append([start, end])
                continue
            if start < remove_start:
                result.append([start, remove_start])
            if end > remove_end:
                result.append([remove_end, end])
        return result
