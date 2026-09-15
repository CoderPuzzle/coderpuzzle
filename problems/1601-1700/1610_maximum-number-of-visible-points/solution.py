import math
from typing import List


class Solution:
    def visiblePoints(self, points: List[List[int]], angle: int, location: List[int]) -> int:
        posx, posy = location
        same = 0
        degrees: List[float] = []
        for x, y in points:
            if x == posx and y == posy:
                same += 1
            else:
                deg = math.degrees(math.atan2(y - posy, x - posx))
                if deg < 0:
                    deg += 360.0
                degrees.append(deg)

        degrees.sort()
        n = len(degrees)
        doubled = degrees + [d + 360.0 for d in degrees]

        eps = 1e-9
        best = 0
        left = 0
        for right in range(len(doubled)):
            while doubled[right] - doubled[left] > angle + eps:
                left += 1
            best = max(best, min(right - left + 1, n))

        return same + best
