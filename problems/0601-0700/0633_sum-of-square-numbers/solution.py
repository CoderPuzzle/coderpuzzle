from math import isqrt


class Solution:
    def judgeSquareSum(self, c: int) -> bool:
        # A witness a² + b² = c confines both roots to 0..isqrt(c) — past
        # the root, one square alone would already top c — and the total
        # rises with a and falls with b, so two pointers sweep that
        # candidate triangle from its ends: a from 0, b from isqrt(c),
        # each probe comparing a² + b² with c, growing a on a shortfall
        # and shrinking b on an overshoot. A window that closes at a > b
        # saw no witness: 5 meets 1² + 2², while 3 runs 0² + 1² and
        # 1² + 1² short and exits. isqrt is exact by specification and
        # Python's integers are arbitrary-precision, so no square rounds.
        a = 0
        b = isqrt(c)
        while a <= b:
            total = a * a + b * b
            if total == c:
                return True
            if total < c:
                a += 1
            else:
                b -= 1
        return False
