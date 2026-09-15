import math
import random
from typing import List


class Solution:
    def __init__(self, radius: float, x_center: float, y_center: float):
        self.radius = radius
        self.x_center = x_center
        self.y_center = y_center
        self.rng = random.Random(478)

    def randPoint(self) -> List[float]:
        while True:
            dx = (2.0 * self.rng.random() - 1.0) * self.radius
            dy = (2.0 * self.rng.random() - 1.0) * self.radius
            if dx * dx + dy * dy <= self.radius * self.radius:
                break
        half = self.radius * 0.5
        i = min(3, max(0, math.floor(dx / half) + 2))
        j = min(3, max(0, math.floor(dy / half) + 2))
        return [self.x_center + (i - 1.5) * half, self.y_center + (j - 1.5) * half]
