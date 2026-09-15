from typing import List


class Solution:
    def findMaximalUncoveredRanges(self, n: int, ranges: List[List[int]]) -> List[List[int]]:
        # n can be 10^9, so nothing may touch cells directly. Sorting by
        # start and sweeping a cursor turns every stretch the cursor
        # skips over into one maximal uncovered range.
        rs = sorted(ranges)
        res = []
        cur = 0
        for s, e in rs:
            if s > cur:
                # Cells [cur, s - 1] meet no covering range.
                res.append([cur, s - 1])
            if e + 1 > cur:
                cur = e + 1
        if cur < n:
            res.append([cur, n - 1])
        return res
