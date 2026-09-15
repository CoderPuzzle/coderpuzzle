class Solution:
    def rotatedDigits(self, n: int) -> int:
        # Rotation replaces 0, 1, 8 by themselves and trades 2 with 5,
        # 6 with 9, so a candidate is good exactly when its decimal
        # writing holds no 3, 4, 7 — digits with no rotation — and at
        # least one of the four trading digits. Peeling digits off the
        # tail with %10 and //10 walks the writing from last digit to
        # first: an unrotatable digit vetoes the number on sight, a
        # trading digit promotes it, and only a walk ending with no veto
        # and a promotion lands in the count.
        count = 0
        for i in range(1, n + 1):
            good = False
            m = i
            while m > 0:
                d = m % 10
                if d == 3 or d == 4 or d == 7:
                    good = False
                    break
                if d == 2 or d == 5 or d == 6 or d == 9:
                    good = True
                m //= 10
            if good:
                count += 1
        return count
