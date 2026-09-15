from typing import List


class Solution:
    def isReflected(self, points: List[List[int]]) -> bool:
        # Reflection swaps the extreme columns, so the only axis that can
        # work is x = (min_x + max_x) / 2: pin the sum s = min_x + max_x.
        s = min(point[0] for point in points) + max(point[0] for point in points)
        seen = {(x, y) for x, y in points}
        # The axis may fall between columns, so mirror with the integer sum:
        # every point needs its partner (s - x, y) in the set, where repeated
        # points simply collapse.
        return all((s - x, y) in seen for x, y in points)
