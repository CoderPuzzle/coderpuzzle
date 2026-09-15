from typing import List, Optional


class Solution:
    def maxWidthOfVerticalArea(self, points: List[List[int]]) -> int:
        xs = sorted(point[0] for point in points)
        return max(b - a for a, b in zip(xs, xs[1:]))
