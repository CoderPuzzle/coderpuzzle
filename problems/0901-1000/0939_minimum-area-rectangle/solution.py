from typing import List


class Solution:
    def minAreaRect(self, points: List[List[int]]) -> int:
        # A rectangle with sides parallel to the axes is pinned by two
        # opposite corners: (x1, y1) and (x2, y2) with x1 != x2 and
        # y1 != y2 close one exactly when (x1, y2) and (x2, y1) are also
        # present, and its area is |x1 - x2| * |y1 - y2|. So every point
        # goes into a set, every pair is tried as a candidate diagonal,
        # and two O(1) membership tests decide whether the rectangle
        # exists at all.
        seen = {(x, y) for x, y in points}
        best = 0
        for i, (x1, y1) in enumerate(points):
            for x2, y2 in points[i + 1 :]:
                if x1 != x2 and y1 != y2 and (x1, y2) in seen and (x2, y1) in seen:
                    area = abs(x1 - x2) * abs(y1 - y2)
                    if best == 0 or area < best:
                        best = area
        return best
