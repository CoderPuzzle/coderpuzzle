import math
from typing import List


class Solution:
    def internalAngles(self, sides: List[int]) -> List[float]:
        a, b, c = sorted(sides)
        if a + b <= c:
            return []

        result = []
        ordered = (a, b, c)
        for i in range(3):
            opposite = ordered[i]
            adjacent1 = ordered[(i + 1) % 3]
            adjacent2 = ordered[(i + 2) % 3]
            cosine = (adjacent1 * adjacent1 + adjacent2 * adjacent2 - opposite * opposite) / (
                2.0 * adjacent1 * adjacent2
            )
            angle = math.degrees(math.acos(max(-1.0, min(1.0, cosine))))
            result.append(round(angle, 5))
        return result
