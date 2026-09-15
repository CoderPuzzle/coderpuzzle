from typing import List


class Solution:
    def numberOfPairs(self, points: List[List[int]]) -> int:
        # Sorting by x ascending, y descending puts both ends of every valid
        # pair in a fixed order: each anchor's partners come strictly later
        # in the array.
        points.sort(key=lambda p: (p[0], -p[1]))
        total = 0
        for i in range(len(points)):
            yi = points[i][1]
            # Every point already scanned between i and j has its x inside
            # the pair's span, so only the vertical window matters: best is
            # the largest y accepted so far, and yi >= yj > best holds
            # exactly when no other point lies in the closed rectangle —
            # rejected points are dominated by some accepted one, accepted
            # points are themselves inside it. Equal coordinates count as
            # on-the-line pairs; the border blocks everyone else.
            best = -1  # coordinates are >= 0, so -1 is below everything
            for j in range(i + 1, len(points)):
                yj = points[j][1]
                if yi >= yj > best:
                    total += 1
                    best = yj
        return total
