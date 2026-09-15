from typing import List


class Solution:
    def findRightInterval(self, intervals: List[List[int]]) -> List[int]:
        # The right interval question is a lower-bound query: pair each
        # start with its index, sort by start, and the answer for an end is
        # the first pair whose start reaches it.
        order = sorted(range(len(intervals)), key=lambda i: intervals[i][0])
        starts = [intervals[i][0] for i in order]
        result: List[int] = []
        for _, end in intervals:
            # Smallest slot whose start is >= end; len(starts) if none. The
            # kept half always contains that boundary, so the window halves
            # until only the boundary is left.
            lo, hi = 0, len(starts)
            while lo < hi:
                mid = (lo + hi) // 2
                if starts[mid] < end:
                    lo = mid + 1
                else:
                    hi = mid
            # i may equal j: an end its own start already reaches finds the
            # interval itself; off the end means no start qualifies.
            result.append(order[lo] if lo < len(starts) else -1)
        return result
