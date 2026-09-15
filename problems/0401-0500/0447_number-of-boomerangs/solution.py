from typing import List


class Solution:
    def numberOfBoomerangs(self, points: List[List[int]]) -> int:
        total = 0
        for i, (x1, y1) in enumerate(points):
            # A boomerang is pinned by its apex: the other two points merely
            # have to sit at the same distance from it, so group every other
            # point by squared distance — equal squares mean equal lengths,
            # and no square root ever gets the chance to round.
            counts = {}
            for j, (x2, y2) in enumerate(points):
                if j == i:
                    continue
                d2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
                counts[d2] = counts.get(d2, 0) + 1
            # c points at one distance fill the two ordered slots of the
            # tuple in c * (c - 1) ways — either of them may come first.
            for c in counts.values():
                total += c * (c - 1)
        return total
