from typing import List, Optional


class Solution:
    def checkOverlap(
        self,
        radius: int,
        xCenter: int,
        yCenter: int,
        x1: int,
        y1: int,
        x2: int,
        y2: int,
    ) -> bool:
        # The nearest point of an axis-aligned box to any point is found
        # coordinate-wise: clamp each coordinate into the box's interval.
        nearest_x = max(x1, min(xCenter, x2))
        nearest_y = max(y1, min(yCenter, y2))
        dx = xCenter - nearest_x
        dy = yCenter - nearest_y
        return dx * dx + dy * dy <= radius * radius
