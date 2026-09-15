from typing import List


class Solution:
    def checkValidCuts(self, n: int, rectangles: List[List[int]]) -> bool:
        # Two cuts split the rectangles along one axis exactly when that
        # axis's [start, end] projections fall into three or more groups.
        # Sweep the sorted projections once with a running furthest end:
        # each next start at or beyond it is a gap where a cut can pass
        # (touching edges included), and two such gaps make three groups.
        def has_two_gaps(axis: int) -> bool:
            intervals = sorted((r[axis], r[axis + 2]) for r in rectangles)
            gaps = 0
            reach = intervals[0][1]
            for start, end in intervals[1:]:
                if start >= reach:
                    gaps += 1
                    if gaps == 2:
                        return True
                if end > reach:
                    reach = end
            return False

        return has_two_gaps(0) or has_two_gaps(1)
