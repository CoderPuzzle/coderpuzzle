from math import gcd
from typing import List


class Solution:
    def interchangeableRectangles(self, rectangles: List[List[int]]) -> int:
        total = 0
        counts = {}
        for width, height in rectangles:
            divisor = gcd(width, height)
            ratio = (width // divisor, height // divisor)
            total += counts.get(ratio, 0)
            counts[ratio] = counts.get(ratio, 0) + 1
        return total
