class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        # Squares march upward in lockstep — 1, 4, 9, 16, … — the map
        # r -> r * r is strictly increasing over the positives, so "is num a
        # perfect square" asks whether one sorted row contains num, and a
        # sorted row is exactly what binary search interrogates. Keep the root
        # candidates in lo..hi (starting 1..num — a root never exceeds its own
        # number), square each midpoint, and move lo above a probe that fell
        # short or hi below one that overshot. An empty interval means no root;
        # only an exact hit ever returned true. Python's integers are
        # arbitrary-precision, so mid * mid is exact at any width.
        lo, hi = 1, num
        while lo <= hi:
            mid = (lo + hi) // 2
            square = mid * mid
            if square == num:
                return True
            if square < num:
                lo = mid + 1
            else:
                hi = mid - 1
        return False
