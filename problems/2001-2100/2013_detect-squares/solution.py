from typing import Dict, List, Tuple


class DetectSquares:
    def __init__(self):
        self.frequencies: Dict[Tuple[int, int], int] = {}

    def add(self, point: List[int]):
        key = (point[0], point[1])
        self.frequencies[key] = self.frequencies.get(key, 0) + 1

    def count(self, point: List[int]) -> int:
        x, y = point
        total = 0
        for (x2, y2), horizontal in self.frequencies.items():
            if y2 != y or x2 == x:
                continue
            distance = abs(x2 - x)
            total += (
                horizontal * self.frequencies.get((x, y + distance), 0) * self.frequencies.get((x2, y + distance), 0)
            )
            total += (
                horizontal * self.frequencies.get((x, y - distance), 0) * self.frequencies.get((x2, y - distance), 0)
            )
        return total
