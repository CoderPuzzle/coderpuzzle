from typing import List


class Solution:
    def minRectanglesToCoverPoints(self, points: List[List[int]], w: int) -> int:
        # Height never matters -- a rectangle's top may rise arbitrarily,
        # so its reach is just the x-interval [start, start + w]. Sorting
        # the x coordinates reduces the task to packing them into the
        # fewest windows of width w: plant a window at the first
        # uncovered point, drop everything it reaches, repeat. Since both
        # coordinates are <= 10**9, x - anchor stays inside int bounds in
        # every language, avoiding any width-sum overflow.
        xs = sorted(x for x, _y in points)
        count = 1
        anchor = xs[0]
        for x in xs[1:]:
            if x - anchor > w:
                count += 1
                anchor = x
        return count
