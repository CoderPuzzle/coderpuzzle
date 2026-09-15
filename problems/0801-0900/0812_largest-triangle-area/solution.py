from typing import List


class Solution:
    def largestTriangleArea(self, points: List[List[int]]) -> float:
        # Every triangle is three of the points, and at most C(50,3) =
        # 19,600 triples is few enough to enumerate them all: three nested
        # loops over i < j < k keep the largest area. The area is half the
        # absolute cross product of the edge vectors b - a and c - a, kept
        # in exact integers until the single final division by 2 — a power
        # of two, so the returned double is exact and a degenerate
        # (collinear) triple simply contributes area 0.
        n = len(points)
        best = 0.0
        for i in range(n):
            ax, ay = points[i]
            for j in range(i + 1, n):
                bx, by = points[j]
                ux, uy = bx - ax, by - ay
                for k in range(j + 1, n):
                    cx, cy = points[k]
                    cross = ux * (cy - ay) - uy * (cx - ax)
                    area = abs(cross) / 2.0
                    if area > best:
                        best = area
        return best
