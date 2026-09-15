import math
from typing import List, Optional


class Solution:
    def getMinDistSum(self, positions: List[List[int]]) -> float:
        n = len(positions)
        # start from the centroid, a reasonable first guess for the median
        x = sum(p[0] for p in positions) / n
        y = sum(p[1] for p in positions) / n
        eps = 1e-9  # keeps the weight finite if the guess lands on a customer
        for _ in range(300):
            num_x = num_y = weight_sum = 0.0
            for px, py in positions:
                distance = math.hypot(x - px, y - py) + eps
                weight = 1.0 / distance
                num_x += weight * px
                num_y += weight * py
                weight_sum += weight
            x, y = num_x / weight_sum, num_y / weight_sum
        return sum(math.hypot(x - px, y - py) for px, py in positions)
