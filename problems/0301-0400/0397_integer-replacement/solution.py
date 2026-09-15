class Solution:
    def integerReplacement(self, n: int) -> int:
        # Even n has one move: halve it. An odd n is decided by its low two
        # bits. ...01 (n % 4 == 1) decrements for free — the low 1 clears and
        # the next halving rides a longer run of zeros, while +1 would carry
        # into bits that are already 0. ...11 (n % 4 == 3) increments: the
        # carry collapses the whole trailing run of 1s into one higher bit,
        # retiring every 1 in it at once. n == 3 is the exception —
        # 3 - 1 -> 2 -> 1 takes two steps where 3 + 1 -> 4 -> 2 -> 1 takes
        # three.
        if n == 1:
            return 0
        if n % 2 == 0:
            return 1 + self.integerReplacement(n // 2)
        if n == 3 or n % 4 == 1:
            return 1 + self.integerReplacement(n - 1)
        return 1 + self.integerReplacement(n + 1)
