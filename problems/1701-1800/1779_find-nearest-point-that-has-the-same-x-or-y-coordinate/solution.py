from typing import List


class Solution:
    def nearestValidPoint(self, x: int, y: int, points: List[List[int]]) -> int:
        # A valid point already agrees with one coordinate, so its Manhattan
        # distance is just the absolute gap on the other coordinate.
        best_dist = float("inf")
        best_index = -1
        for i, (a, b) in enumerate(points):
            if a == x or b == y:
                dist = abs(b - y) if a == x else abs(a - x)
                # Strict improvement only: an equal distance keeps the earlier
                # index, which is exactly the statement's tie rule.
                if dist < best_dist:
                    best_dist = dist
                    best_index = i
        return best_index
