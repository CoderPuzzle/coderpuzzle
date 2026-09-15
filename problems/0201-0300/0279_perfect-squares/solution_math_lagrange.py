from typing import List, Optional

from math import isqrt


class Solution:
    def numSquares(self, n: int) -> int:
        def is_square(x: int) -> bool:
            root = isqrt(x)
            return root * root == x

        # Legendre's three-square theorem: n is a sum of three squares
        # unless it has the form 4^a(8b+7). Strip the factors of 4, then
        # test the leftover's residue mod 8.
        remainder = n
        while remainder % 4 == 0:
            remainder //= 4
        if remainder % 8 == 7:
            # No three (or fewer) squares reach such a number, so Lagrange's
            # four-square theorem pins the answer at exactly 4.
            return 4
        # One square: n itself.
        if is_square(n):
            return 1
        # Two squares: some a pairs with the leftover square n - a·a.
        a = 1
        while a * a * 2 <= n:
            if is_square(n - a * a):
                return 2
            a += 1
        # 4 is ruled out by Legendre, 1 and 2 by the checks above.
        return 3
