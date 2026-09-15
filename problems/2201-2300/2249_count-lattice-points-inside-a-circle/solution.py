from typing import List


class Solution:
    def countLatticePoints(self, circles: List[List[int]]) -> int:
        points = set()
        for x, y, r in circles:
            for px in range(x - r, x + r + 1):
                for py in range(y - r, y + r + 1):
                    if (px - x) ** 2 + (py - y) ** 2 <= r * r:
                        points.add((px, py))
        return len(points)
