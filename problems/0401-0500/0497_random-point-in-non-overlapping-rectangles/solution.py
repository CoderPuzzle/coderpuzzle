import random
from bisect import bisect_left


class Solution:
    """Prefix sums over rectangle areas (integer cells, (xi-ai+1)*(yi-bi+1))
    select a rectangle with probability proportional to its area; a uniform
    cell offset inside it yields the point — so every covered integer point
    is exactly equally likely."""

    def __init__(self, rects: list[list[int]]) -> None:
        self.rects = rects
        self.prefix = [0] * (len(rects) + 1)
        for i, (ai, bi, xi, yi) in enumerate(rects):
            self.prefix[i + 1] = self.prefix[i] + (xi - ai + 1) * (yi - bi + 1)

    def pick(self) -> list[int]:
        cell = random.randrange(self.prefix[-1])
        index = bisect_left(self.prefix, cell + 1) - 1
        ai, bi, xi, _ = self.rects[index]
        width = xi - ai + 1
        offset = cell - self.prefix[index]
        return [ai + offset % width, bi + offset // width]
