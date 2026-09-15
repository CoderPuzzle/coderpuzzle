from math import isqrt
from typing import List


class Solution:
    def closestDivisors(self, num: int) -> List[int]:
        # The closest pair for a product m has its smaller factor as large
        # as possible: the first divisor found walking down from isqrt(m).

        def closest(m: int) -> List[int]:
            d = isqrt(m)
            while m % d != 0:
                d -= 1
            return [d, m // d]

        a = closest(num + 1)
        b = closest(num + 2)
        return a if a[1] - a[0] <= b[1] - b[0] else b
