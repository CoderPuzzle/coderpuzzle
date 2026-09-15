from typing import List


class Solution:
    def largestSquareArea(self, bottomLeft: List[List[int]], topRight: List[List[int]]) -> int:
        # Two axis-aligned rectangles intersect in another rectangle: clamp
        # each axis between the higher of the low edges and the lower of the
        # high edges. A square inside it can be at most min(width, height)
        # on a side, so every strictly positive overlap pair contributes
        # exactly that square's area.
        best = 0
        n = len(bottomLeft)
        for i in range(n):
            ax, ay = bottomLeft[i]
            cx, cy = topRight[i]
            for j in range(i + 1, n):
                width = min(cx, topRight[j][0]) - max(ax, bottomLeft[j][0])
                height = min(cy, topRight[j][1]) - max(ay, bottomLeft[j][1])
                if width > 0 and height > 0:
                    side = min(width, height)
                    best = max(best, side * side)
        return best
