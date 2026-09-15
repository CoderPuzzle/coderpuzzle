from typing import List, Optional


class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        arrows = 0
        # None (not 0) marks "no arrow yet" since coordinates can be <= 0.
        last_arrow = None
        # Point-cover greedy: sort by right endpoint and shoot at the right
        # end of the first unburst balloon — among points covering it, the
        # right endpoint covers every interval any earlier point could.
        for start, end in sorted(points, key=lambda x: x[1]):
            # Strict >: intervals are closed, so start == last_arrow is
            # already burst; otherwise shoot at the earliest end remaining.
            if last_arrow is None or start > last_arrow:
                arrows += 1
                last_arrow = end
        return arrows
