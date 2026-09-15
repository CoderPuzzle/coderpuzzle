from typing import List, Optional


class Solution:
    def solveEquation(self, equation: str) -> str:
        # Split at the one '=' and reduce each side to a*x + b with a single
        # scan. A term is an optional sign, digits (empty before an 'x' means
        # coefficient 1), and a possible trailing 'x'; '0x' contributes a zero
        # coefficient and drops out by itself.
        def parse(side: str):
            a = b = 0
            i, n = 0, len(side)
            while i < n:
                sign = 1
                if side[i] in "+-":
                    sign = -1 if side[i] == "-" else 1
                    i += 1
                value = 0
                has_digits = False
                while i < n and side[i].isdigit():
                    value = value * 10 + int(side[i])
                    has_digits = True
                    i += 1
                if i < n and side[i] == "x":
                    a += sign * (value if has_digits else 1)
                    i += 1
                else:
                    b += sign * value
            return a, b

        left, right = equation.split("=")
        la, lb = parse(left)
        ra, rb = parse(right)
        # la*x + lb = ra*x + rb  ->  (la - ra)*x = rb - lb. A zero coefficient
        # leaves either every x or no x; otherwise the division is exact.
        a = la - ra
        b = rb - lb
        if a == 0:
            return "Infinite solutions" if b == 0 else "No solution"
        return "x=" + str(b // a)
