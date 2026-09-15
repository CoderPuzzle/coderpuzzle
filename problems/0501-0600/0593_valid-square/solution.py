from typing import List


class Solution:
    def validSquare(self, p1: List[int], p2: List[int], p3: List[int], p4: List[int]) -> bool:
        points = [p1, p2, p3, p4]
        d2 = []
        # Six pairs hide among four points — four sides and two diagonals.
        # Grouping by squared length compares exactly what distances
        # compare, so no square root ever gets the chance to round.
        for i in range(4):
            for j in range(i + 1, 4):
                dx = points[j][0] - points[i][0]
                dy = points[j][1] - points[i][1]
                d2.append(dx * dx + dy * dy)
        d2.sort()
        # Sorted, a square is exactly the multiset a, a, a, a, b, b: the
        # four equal sides come first and the two equal diagonals after,
        # with a > 0 so a collapsed point cannot pose as a side.
        return d2[0] > 0 and d2[0] == d2[3] and d2[4] == d2[5] and d2[3] != d2[4]
