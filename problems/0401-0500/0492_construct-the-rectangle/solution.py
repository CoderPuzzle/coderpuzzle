from math import isqrt
from typing import List


class Solution:
    def constructRectangle(self, area: int) -> List[int]:
        # The best width is the largest divisor of area at or below its square
        # root: every factorization pairs a divisor above the root with one
        # below it, a larger W means a smaller L = area / W, and requirement 2
        # pins the answer to the below-root half — so the widest such W
        # minimizes L - W while keeping L >= W. isqrt is exact, so the start
        # needs no float correction; a prime walks all the way to [p, 1] and
        # a perfect square returns immediately with L == W.
        width = isqrt(area)
        while area % width != 0:
            width -= 1
        return [area // width, width]
