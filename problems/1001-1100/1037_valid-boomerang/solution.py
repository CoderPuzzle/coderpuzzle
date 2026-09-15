from typing import List


class Solution:
    def isBoomerang(self, points: List[List[int]]) -> bool:
        (x1, y1), (x2, y2), (x3, y3) = points
        # Cross product of (p2 - p1) and (p3 - p1); zero exactly when the
        # two edge vectors are parallel, which also covers any duplicate
        # point (a zero vector is parallel to everything).
        cross = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1)
        return cross != 0
