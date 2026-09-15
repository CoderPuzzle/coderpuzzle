import math
from typing import List, Optional


class Solution:
    def bestCoordinate(self, towers: List[List[int]], radius: int) -> List[int]:
        best_x, best_y, best_quality = 0, 0, -1
        for x in range(51):
            for y in range(51):
                total = 0
                for tx, ty, tq in towers:
                    dx, dy = tx - x, ty - y
                    d = math.sqrt(dx * dx + dy * dy)
                    if d <= radius:
                        total += math.floor(tq / (1 + d))
                if total > best_quality:
                    best_quality = total
                    best_x, best_y = x, y
        return [best_x, best_y]
