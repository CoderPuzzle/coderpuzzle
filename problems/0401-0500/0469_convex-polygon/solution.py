from typing import List


class Solution:
    def isConvex(self, points: List[List[int]]) -> bool:
        # A convex polygon turns the same way at every vertex: the cross
        # product of the incoming and outgoing edge vectors is positive at
        # every left turn or negative at every right turn, so one sign of
        # each anywhere is a refutation.
        n = len(points)
        positive = negative = False
        for i in range(n):
            x1 = points[i][0] - points[i - 1][0]
            y1 = points[i][1] - points[i - 1][1]
            x2 = points[(i + 1) % n][0] - points[i][0]
            y2 = points[(i + 1) % n][1] - points[i][1]
            # z == 0 means three consecutive vertices are collinear — legal
            # along an edge, so it votes for neither side.
            z = x1 * y2 - y1 * x2
            if z > 0:
                positive = True
            elif z < 0:
                negative = True
            if positive and negative:
                return False
        return True
