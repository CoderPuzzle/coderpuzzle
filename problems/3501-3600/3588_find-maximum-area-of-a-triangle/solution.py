from typing import List
from collections import defaultdict


class Solution:
    def maxArea(self, coords: List[List[int]]) -> int:
        # A valid triangle needs a horizontal or vertical side. On a
        # horizontal line y the widest base is the x-span of that line,
        # and the tallest apex is the global top or bottom point,
        # whichever lies off the line — so every line contributes two
        # O(1) candidates once points are grouped. Vertical sides
        # mirror this. 2 * area <= 2 * (10^6)^2, so 64-bit math.
        by_y = defaultdict(list)
        by_x = defaultdict(list)
        for x, y in coords:
            by_y[y].append(x)
            by_x[x].append(y)
        gxmin = min(by_x)
        gxmax = max(by_x)
        gymin = min(by_y)
        gymax = max(by_y)
        best = -1
        for y, row in by_y.items():
            if len(row) < 2:
                continue
            base = max(row) - min(row)
            if gymax != y:
                best = max(best, base * (gymax - y))
            if gymin != y:
                best = max(best, base * (y - gymin))
        for x, col in by_x.items():
            if len(col) < 2:
                continue
            base = max(col) - min(col)
            if gxmax != x:
                best = max(best, base * (gxmax - x))
            if gxmin != x:
                best = max(best, base * (x - gxmin))
        return best
